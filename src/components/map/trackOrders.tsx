import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';

interface Coord {
  lat: number;
  lng: number;
}

interface TrackOrderProps {
  coords: Coord[];
}

const icon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const ChangeView: React.FC<{ center: Coord; zoom: number }> = ({ center, zoom }) => {
  const map = useMap();

  useEffect(() => {
    console.log("ChangeView: moviendo mapa a", center, "con zoom", zoom);
    map.flyTo([center.lat, center.lng], zoom);
  }, [center.lat, center.lng, zoom, map]);

  return null;
};

const TrackOrder: React.FC<TrackOrderProps> = ({ coords }) => {
  console.log("TrackOrder render, coords:", coords);
  const defaultCenter = { lat: 4.7110, lng: -74.0721 };
  const lastCoord = coords.length > 0 ? coords[coords.length - 1] : defaultCenter;
  const zoomLevel = 16; // Zoom aumentado (antes 13)

  return (
    <div style={{ height: '400px', width: '100%' }}>
      <MapContainer center={[defaultCenter.lat, defaultCenter.lng]} zoom={zoomLevel} scrollWheelZoom style={{ height: '100%', width: '100%' }}>
        <ChangeView center={lastCoord} zoom={zoomLevel} />
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {coords.map((pos) => (
          <Marker key={`${pos.lat}-${pos.lng}`} position={[pos.lat, pos.lng]} icon={icon} />
        ))}
        {coords.length > 1 && <Polyline positions={coords.map(c => [c.lat, c.lng])} color="blue" />}
      </MapContainer>
    </div>
  );
};

export default TrackOrder;
