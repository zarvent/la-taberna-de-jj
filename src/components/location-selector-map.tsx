
"use client";

import React, { useEffect, useRef, memo, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, type MapContainerProps } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import type L from 'leaflet';
import { Loader2 } from 'lucide-react';

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
LocationClickHandler.displayName = 'LocationClickHandler';

interface LocationSelectorMapProps {
  center: L.LatLngTuple;
  zoom: number;
  selectedPosition: L.LatLngTuple | null;
  onMapClick: (latlng: L.LatLngTuple) => void;
  mapPlaceholder: React.ReactNode;
}

const LocationSelectorMapComponent = memo(function LocationSelectorMapComponent({
  center,
  zoom,
  selectedPosition,
  onMapClick,
  mapPlaceholder,
}: LocationSelectorMapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const [mapKey, setMapKey] = useState(0); // Key to force MapContainer remount

  useEffect(() => {
    // This effect's primary role is to manage cleanup.
    // The mapRef will be populated by the whenCreated callback.
    return () => {
      if (mapRef.current) {
        // console.log("LocationSelectorMapComponent unmounting, removing map:", mapRef.current);
        mapRef.current.remove();
        mapRef.current = null;
        // console.log("mapRef.current nulled. Incrementing mapKey for next mount.");
        // Increment key to ensure next MapContainer instance is completely new
        // This helps with HMR and React StrictMode's double invoke effects
        setMapKey(prevKey => prevKey + 1);
      }
    };
  }, []); // Empty dependency array: runs effect on mount, cleanup on unmount.

  return (
    <MapContainer
      key={mapKey} // Crucial: forces React to create a new instance if key changes
      center={center}
      zoom={zoom}
      scrollWheelZoom={true}
      style={{ height: '100%', width: '100%' }}
      className="rounded-lg z-0"
      placeholder={mapPlaceholder}
      whenCreated={(mapInstance) => {
        // In Strict Mode, this might be called twice if the component re-mounts.
        // The guard ensures we only assign if our ref is currently null.
        if (mapRef.current === null) {
          mapRef.current = mapInstance;
          // console.log("Map instance assigned to mapRef:", mapInstance);
        } else {
          // This case might happen if whenCreated is called again without a proper unmount/cleanup cycle
          // or on an HMR update where the ref wasn't nulled.
          // If mapInstance is different and old one was not cleaned, this can be an issue.
          // The key change and cleanup should prevent this.
          // console.warn("whenCreated called but mapRef.current was not null. Potential issue or HMR reload.", mapRef.current, mapInstance);
        }
      }}
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
});

LocationSelectorMapComponent.displayName = 'LocationSelectorMap';
export { LocationSelectorMapComponent as LocationSelectorMap };
