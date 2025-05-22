
"use client";

import React, { useEffect, useRef, memo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, type MapContainerProps } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import type L from 'leaflet';
// Ensure lucide-react is imported if used in mapPlaceholder
// import { Loader2 } from 'lucide-react';

// Leaflet's default icon path fix
// This needs to run only once on the client.
if (typeof window !== 'undefined') {
  const LGlobal = require('leaflet');
  // Check if prototype and _getIconUrl exist to prevent errors if already deleted or in different env
  if (LGlobal.Icon?.Default?.prototype && (LGlobal.Icon.Default.prototype as any)._getIconUrl) {
    delete (LGlobal.Icon.Default.prototype as any)._getIconUrl;
  }
  LGlobal.Icon?.Default?.mergeOptions?.({
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
  mapPlaceholder: React.ReactNode; // Placeholder to show before map is ready or if it fails
}

const LocationSelectorMapComponent = memo(function LocationSelectorMapComponent({
  center,
  zoom,
  selectedPosition,
  onMapClick,
  mapPlaceholder,
}: LocationSelectorMapProps) {
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    // This effect's primary role is to manage cleanup for the Leaflet map instance
    // when this component unmounts (or during StrictMode's unmount/remount cycle).
    return () => {
      const currentMap = mapRef.current;
      if (currentMap) {
        // console.log("LocationSelectorMapComponent unmounting, removing map:", currentMap);
        currentMap.remove();
        mapRef.current = null; // CRITICAL: Nullify the ref after removing the map instance.
        // console.log("mapRef.current nulled in cleanup.");
      }
    };
  }, []); // Empty dependency array: runs effect on mount, cleanup on unmount.

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      scrollWheelZoom={true}
      style={{ height: '100%', width: '100%' }}
      className="rounded-lg z-0" // z-0 can sometimes help with stacking context issues if popups are hidden
      placeholder={mapPlaceholder} // Provided by parent, typically a loading spinner
      whenCreated={(mapInstance) => {
        // This callback is invoked by react-leaflet when the Leaflet map instance is ready.
        // In Strict Mode, this might be called twice if the component re-mounts.
        // The guard ensures we only assign if our ref is currently null.
        if (mapRef.current === null) {
          mapRef.current = mapInstance;
          // console.log("Map instance assigned to mapRef:", mapInstance);
        } else {
          // This case might happen if whenCreated is called again without a proper unmount/cleanup cycle
          // or on an HMR update where the ref wasn't nulled.
          // The cleanup effect should prevent this by nulling mapRef.current.
          // console.warn("whenCreated called but mapRef.current was not null. This might happen with HMR or StrictMode if cleanup/re-mount is not perfect.", mapRef.current, mapInstance);
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

LocationSelectorMapComponent.displayName = 'LocationSelectorMap'; // For better debugging
export { LocationSelectorMapComponent as LocationSelectorMap };
