
"use client";

import React, { useEffect, useRef, memo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, type MapContainerProps } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import type L from 'leaflet';

// Fix Leaflet's default icon path issue with bundlers
if (typeof window !== 'undefined') {
  const LGlobal = require('leaflet');
  delete (LGlobal.Icon.Default.prototype as any)._getIconUrl;
  LGlobal.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  });
}

interface LocationClickHandlerProps {
  onMapClick: (latlng: L.LatLngTuple) => void;
}

const LocationClickHandler = ({ onMapClick }: LocationClickHandlerProps) => {
  const map = useMapEvents({
    click(e: L.LeafletMouseEvent) {
      const newPos: L.LatLngTuple = [e.latlng.lat, e.latlng.lng];
      onMapClick(newPos);
      map.flyTo(e.latlng, map.getZoom());
    },
  });
  return null;
};

interface LocationSelectorMapProps {
  center: L.LatLngTuple;
  zoom: number;
  selectedPosition: L.LatLngTuple | null;
  onMapClick: (latlng: L.LatLngTuple) => void;
  mapPlaceholder: React.ReactNode;
}

const LocationSelectorMapComponent = ({
  center,
  zoom,
  selectedPosition,
  onMapClick,
  mapPlaceholder,
}: LocationSelectorMapProps) => {
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    // Cleanup function for this specific map instance
    const currentMap = mapRef.current;
    return () => {
      if (currentMap) {
        // console.log("LocationSelectorMapComponent unmounting, removing its map instance:", currentMap);
        currentMap.remove();
      }
    };
  }, []); // Empty dependency array ensures this runs only once when this component unmounts

  return (
    <MapContainer
      whenCreated={(mapInstance) => {
        // Only assign if mapRef.current is null to prevent issues during HMR or double invocations
        if (mapRef.current === null) {
          mapRef.current = mapInstance;
          // console.log("Map instance assigned to LocationSelectorMapComponent's mapRef:", mapInstance);
        }
      }}
      center={center}
      zoom={zoom}
      scrollWheelZoom={true}
      style={{ height: '100%', width: '100%' }}
      className="rounded-lg z-0"
      placeholder={mapPlaceholder}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {selectedPosition && (
        <Marker position={selectedPosition}>
          <Popup>
            Ubicación seleccionada: <br /> Lat: {selectedPosition[0].toFixed(4)}, Lng: {selectedPosition[1].toFixed(4)}
          </Popup>
        </Marker>
      )}
      <LocationClickHandler onMapClick={onMapClick} />
    </MapContainer>
  );
};

LocationSelectorMapComponent.displayName = 'LocationSelectorMap';
export const LocationSelectorMap = memo(LocationSelectorMapComponent);
