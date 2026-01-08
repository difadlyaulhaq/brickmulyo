import { MapContainer, TileLayer, Polygon, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect } from 'react';
import villageData from '../data/village-boundary.json';
import umkmData from '../data/umkm.json';

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
const swapCoords = (coords) => coords.map(([lng, lat]) => [lat, lng]);

// Component to fit map bounds to the village
function FitBounds({ bounds }) {
  const map = useMap();
  useEffect(() => {
    if (bounds) {
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [bounds, map]);
  return null;
}

// Custom Icon definition using DivIcon + SVG
const customMarkerIcon = new L.DivIcon({
  className: 'bg-transparent border-none', // Remove default leaflet square bg
  html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#C04A35" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full drop-shadow-lg filter"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3" fill="white"></circle></svg>`,
  iconSize: [40, 40],
  iconAnchor: [20, 40], // Tip of the pin at bottom center
  popupAnchor: [0, -40],
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

  const borderColor = '#D98E56'; 
  const maskOptions = {
    color: 'transparent', 
    fillColor: '#1E293B', 
    fillOpacity: 0.8,     
    interactive: false     
  };
  
  const borderOptions = {
    color: borderColor,
    weight: 3,
    fillOpacity: 0, 
    interactive: false
  };

  return (
    <div className="h-full w-full rounded-lg overflow-hidden shadow-inner bg-neutralDark relative z-0">
       <MapContainer 
        center={[-7.795, 110.37]} 
        zoom={14} 
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Mask and Border */}
        <Polygon pathOptions={maskOptions} positions={maskPolygon} />
        <Polygon pathOptions={borderOptions} positions={villageCoordsLeaflet} />

        {/* Markers */}
        {umkmData.map((umkm) => (
          <Marker 
            key={umkm.id} 
            position={[umkm.lat, umkm.lng]} 
            icon={customMarkerIcon}
          >
            <Popup className="custom-popup font-sans">
              <div className="min-w-[240px]">
                <div className="relative h-32 w-full mb-3 overflow-hidden rounded-md shadow-sm">
                   <img src={umkm.foto} alt={umkm.nama} className="w-full h-full object-cover" />
                </div>
                <h3 className="font-bold text-neutralDark text-base leading-tight mb-1">{umkm.nama}</h3>
                <p className="text-xs text-primary font-medium mb-2">{umkm.alamat}</p>
                <p className="text-xs text-slate-500 line-clamp-2 mb-3">{umkm.desc}</p>
                
                <div className="flex gap-2">
                  <a 
                    href={`https://wa.me/${umkm.wa}?text=Halo, saya melihat profil usaha Anda di BrickMulyo. Saya tertarik dengan produk Anda.`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 bg-primary text-white text-xs py-2 px-2 rounded text-center font-semibold hover:bg-opacity-90 transition-opacity no-underline shadow-sm"
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

        <FitBounds bounds={villageCoordsLeaflet} />
      </MapContainer>
    </div>
  );
};

export default Map;