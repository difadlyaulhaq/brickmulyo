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
const swapCoords = (coords) => coords.map(([lng, lat]) => [lat, lng]);

// Component to fit map bounds to the village
function FitBounds({ bounds }) {
  const map = useMap();
  useEffect(() => {
    if (bounds) {
      const isMobile = window.innerWidth < 768;
      const padding = isMobile ? [20, 20] : [50, 50];
      map.fitBounds(bounds, { padding: padding });
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
              <div className="min-w-[200px] sm:min-w-[240px]">
                <div className="relative h-24 sm:h-32 w-full mb-3 overflow-hidden rounded-md shadow-sm">
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
      
      <Overlay />
    </div>
  );
};

export default Map;