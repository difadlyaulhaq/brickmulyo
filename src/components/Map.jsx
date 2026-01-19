import { MapContainer, TileLayer, Polygon, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect } from 'react';
import villageData from '../data/village-boundary.json';
import umkmData from '../data/umkm.json';
import Overlay from './Overlay';

// Fix for default marker icons if we ever fallback, though we use custom one.
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIconPng,
  shadowUrl: markerShadow,
});

// Helper to swap [lng, lat] to [lat, lng] for Leaflet
// Accepts either a single ring ([[lng,lat],...]) or an array of rings ([[[lng,lat],...], ...])
const swapCoords = (coords) => {
  if (!coords || coords.length === 0) return [];
  // If first item is a number pair -> single ring
  if (Array.isArray(coords[0]) && typeof coords[0][0] === 'number') {
    return coords.map(([lng, lat]) => [lat, lng]);
  }
  // Otherwise assume array of rings
  return coords.map(ring => (Array.isArray(ring) ? ring.map(([lng, lat]) => [lat, lng]) : []));
};

// Compute 2D convex hull (Andrew's monotone chain) for points [[lat,lng],...]
const convexHull = (points) => {
  if (!points || points.length < 3) return points.slice();
  // sort by lng (x) then lat (y)
  const pts = points.map(p => ({ x: p[1], y: p[0] })).sort((a,b) => a.x === b.x ? a.y - b.y : a.x - b.x);
  const cross = (o, a, b) => (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);
  const lower = [];
  for (const p of pts) {
    while (lower.length >= 2 && cross(lower[lower.length-2], lower[lower.length-1], p) <= 0) lower.pop();
    lower.push(p);
  }
  const upper = [];
  for (let i = pts.length - 1; i >= 0; i--) {
    const p = pts[i];
    while (upper.length >= 2 && cross(upper[upper.length-2], upper[upper.length-1], p) <= 0) upper.pop();
    upper.push(p);
  }
  upper.pop(); lower.pop();
  const hull = lower.concat(upper).map(p => [p.y, p.x]);
  return hull;
};
// Component to fit map bounds to the village
function FitBounds({ bounds }) {
  const map = useMap();
  useEffect(() => {
    if (bounds && bounds.length > 0) {
      const isMobile = window.innerWidth < 768;
      const padding = isMobile ? [20, 20] : [50, 50];
      try {
        // Ensure bounds is converted to a LatLngBounds object
        const llBounds = L.latLngBounds(bounds);
        map.fitBounds(llBounds, { padding: padding });
      } catch (e) {
        // Fallback: try to flatten nested arrays (e.g., polygon rings)
        const flattened = bounds.flat(Infinity).reduce((acc, val, idx, arr) => {
          // reconstruct pairs
          if (idx % 2 === 0 && idx + 1 < arr.length) acc.push([arr[idx], arr[idx+1]]);
          return acc;
        }, []);
        if (flattened.length) {
          map.fitBounds(L.latLngBounds(flattened), { padding: padding });
        }
      }
    }
  }, [bounds, map]);
  return null;
}

// Custom Icon definition using DivIcon + SVG
const customMarkerIcon = new L.DivIcon({
  className: 'bg-transparent border-none',
  html: `<div class="relative flex items-center justify-center">
          <div class="absolute w-8 h-8 md:w-10 md:h-10 bg-yellow-400/20 rounded-full animate-ping"></div>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FACC15" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 md:w-10 md:h-10 drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3" fill="black"></circle></svg>
        </div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const Map = () => {
  const villageCoordsRaw = villageData.features[0].geometry.coordinates[0];
  const villageCoordsLeaflet = swapCoords(villageCoordsRaw);

  const worldPolygon = [
    [90, -180],
    [90, 180],
    [-90, 180],
    [-90, -180],
    [90, -180]
  ];

  const maskPolygon = [
    worldPolygon,
    villageCoordsLeaflet
  ];

  const borderColor = '#FACC15'; 
  const maskOptions = {
    color: 'transparent', 
    fillColor: '#000000', 
    fillOpacity: 0.4,     
    interactive: false     
  };
  
  const borderOptions = {
    color: borderColor,
    weight: 4,
    dashArray: '5, 10',
    fillOpacity: 0, 
    interactive: false
  };

  // Load stored products from localStorage (if user imported or created them)
  const loadStored = () => {
    try {
      const s = JSON.parse(localStorage.getItem('products') || '[]');
      return Array.isArray(s) ? s : [];
    } catch (e) {
      return [];
    }
  };

  const parseCoordsFromGmaps = (gmaps) => {
    if (!gmaps) return null;
    try {
      const u = decodeURIComponent(gmaps);
      let m = u.match(/@(-?\d+\.\d+),\s*(-?\d+\.\d+)/);
      if (m) return { lat: parseFloat(m[1]), lng: parseFloat(m[2]) };
      m = u.match(/[?&]ll=(-?\d+\.\d+),(-?\d+\.\d+)/);
      if (m) return { lat: parseFloat(m[1]), lng: parseFloat(m[2]) };
      m = u.match(/!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/);
      if (m) return { lat: parseFloat(m[1]), lng: parseFloat(m[2]) };
      m = u.match(/(-?\d+\.\d+),\s*(-?\d+\.\d+)/);
      if (m) return { lat: parseFloat(m[1]), lng: parseFloat(m[2]) };
    } catch (e) {
      return null;
    }
    return null;
  };

  const normalizeWa = (cp) => {
    const digits = (cp || '').toString().replace(/[^0-9]/g, '');
    if (!digits) return '';
    if (digits.startsWith('0')) return `62${digits.slice(1)}`;
    if (digits.startsWith('8')) return `62${digits}`;
    if (digits.startsWith('62')) return digits;
    return digits;
  };

  const storedProducts = loadStored().map((p, i) => {
    const lat = (typeof p.lat === 'number') ? p.lat : (typeof p.latitude === 'number' ? p.latitude : null);
    const lng = (typeof p.lng === 'number') ? p.lng : (typeof p.lon === 'number' ? p.lon : (typeof p.longitude === 'number' ? p.longitude : null));
    let coords = { lat, lng };
    if ((coords.lat == null || coords.lng == null) && (p.gmapsLink || p.gmaps)) {
      const parsed = parseCoordsFromGmaps(p.gmapsLink || p.gmaps);
      if (parsed) coords = parsed;
    }
    if (coords.lat == null || coords.lng == null) return null;
    return {
      id: `stored-${i}`,
      nama: p.name || p.nama || 'Produk',
      alamat: p.gmapsLink || p.alamat || '',
      desc: p.desc || p.description || '',
      foto: p.image || p.foto || '/Batu-bata-background.png',
      wa: normalizeWa(p.cp || p.wa || ''),
      lat: coords.lat,
      lng: coords.lng,
    };
  }).filter(Boolean);

  // Combine bundled umkm data with stored products and prepare bounds
  const combinedProducts = [
    ...(Array.isArray(umkmData) ? umkmData.map(u => ({
      id: u.id,
      nama: u.nama || u.name,
      alamat: u.alamat || '',
      desc: u.desc || '',
      foto: u.foto || '/Batu-bata-background.png',
      wa: (u.wa || ''),
      lat: u.lat,
      lng: u.lng,
    })) : []),
    ...storedProducts
  ].filter(it => it && typeof it.lat === 'number' && typeof it.lng === 'number');

  // Bounds derived from markers; fallback to village polygon if none
  const markerBounds = combinedProducts.map(p => [p.lat, p.lng]);
  let fitBoundsTargets = markerBounds.length > 0 ? markerBounds : villageCoordsLeaflet;
  // If there's only one marker, create a small bbox so fitBounds centers nicely
  if (markerBounds.length === 1) {
    const [lat, lng] = markerBounds[0];
    const delta = 0.0025; // ~250m box
    fitBoundsTargets = [[lat - delta, lng - delta], [lat + delta, lng + delta]];
  }

  // Build an enclosing border polygon that includes village + markers.
  // We compute a convex hull of the village polygon vertices plus marker points (with slight padding)
  const hullPolygon = (() => {
    if (!Array.isArray(villageCoordsLeaflet) || villageCoordsLeaflet.length === 0) return villageCoordsLeaflet;
    if (!markerBounds || markerBounds.length === 0) return villageCoordsLeaflet;
    const pts = villageCoordsLeaflet.slice();
    const pad = 0.0015; // ~150m padding around markers
    markerBounds.forEach(([lat, lng]) => {
      pts.push([lat + pad, lng + pad]);
      pts.push([lat - pad, lng + pad]);
      pts.push([lat + pad, lng - pad]);
      pts.push([lat - pad, lng - pad]);
    });
    const hull = convexHull(pts);
    return (hull && hull.length > 2) ? hull : villageCoordsLeaflet;
  })();

  const derivedMaskPolygon = [
    [
      [90, -180],
      [90, 180],
      [-90, 180],
      [-90, -180],
      [90, -180]
    ],
    hullPolygon
  ];

  return (
    <div className="h-full w-full rounded-lg overflow-hidden shadow-inner bg-slate-900 relative z-0">
       {/* Vignette Overlay */}
       <div className="absolute inset-0 z-[300] pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.6)]"></div>
       
       <MapContainer 
        center={[-7.362, 111.035]} 
        zoom={16} 
        style={{ height: '100%', width: '100%', filter: 'brightness(0.7) contrast(1.1)' }}
        scrollWheelZoom={false}
        dragging={true}
        tap={false}
        className="z-0"
      >
        <TileLayer
          attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        />
        
        {/* Mask and Border (derived hull includes markers) */}
        <Polygon pathOptions={maskOptions} positions={derivedMaskPolygon} />
        <Polygon pathOptions={borderOptions} positions={hullPolygon} />

        {/* Markers (from umkm.json + stored local products) */}
        {combinedProducts.map((umkm) => (
          <Marker key={umkm.id} position={[umkm.lat, umkm.lng]} icon={customMarkerIcon}>
            <Popup className="custom-popup font-sans">
              <div className="min-w-[200px] sm:min-w-[240px]">
                <div className="relative h-24 sm:h-32 w-full mb-3 overflow-hidden rounded-md shadow-sm">
                  <img src={umkm.foto} alt={umkm.nama} className="w-full h-full object-cover" />
                </div>
                <h3 className="font-bold text-neutralDark text-base leading-tight mb-1">{umkm.nama}</h3>
                {umkm.alamat && <p className="text-xs text-primary font-medium mb-2">{umkm.alamat}</p>}
                <p className="text-xs text-slate-500 line-clamp-2 mb-3">{umkm.desc}</p>

                <div className="flex gap-2">
                  <a
                    href={umkm.wa ? `https://wa.me/${umkm.wa}?text=Halo, saya melihat profil usaha Anda di BrickMulyo.` : '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex-1 ${umkm.wa ? 'bg-primary text-white' : 'bg-slate-100 text-slate-500 cursor-not-allowed'} text-xs py-2 px-2 rounded text-center font-semibold hover:bg-opacity-90 transition-opacity no-underline shadow-sm`}
                  >
                    Chat WA
                  </a>
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${umkm.lat},${umkm.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-white text-neutralDark border border-slate-300 text-xs py-2 px-2 rounded text-center font-semibold hover:bg-slate-50 transition-colors no-underline shadow-sm"
                  >
                    Navigasi
                  </a>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        <FitBounds bounds={fitBoundsTargets} />
      </MapContainer>
      
      <Overlay />
    </div>
  );
};

export default Map;