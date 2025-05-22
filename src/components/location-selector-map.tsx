
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
LocationClickHandler.displayName = 'LocationClickHandler';


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
    // This effect runs when the component unmounts.
    // In React Strict Mode (development), components are mounted, unmounted, and then re-mounted
    // to help catch issues like improper cleanup.
    const currentMap = mapRef.current; // Capture the current ref value for the cleanup function.
    return () => {
      if (currentMap) {
        // console.log("LocationSelectorMapComponent unmounting, removing its map instance:", currentMap);
        currentMap.remove(); // Tell Leaflet to destroy the map instance and clean up its DOM.
        // Crucially, set mapRef.current to null AFTER removing the map.
        // This ensures that if the component is re-mounted (e.g., by Strict Mode or HMR),
        // the whenCreated callback will find mapRef.current as null and correctly re-initialize.
        if (mapRef.current === currentMap) { // Ensure we are nullifying the same instance we are removing
            mapRef.current = null;
            // console.log("mapRef.current set to null after removal.");
        }
      }
    };
  }, []); // Empty dependency array ensures this runs only on mount and unmount.

  return (
    <MapContainer
      whenCreated={(mapInstance) => {
        // This callback is invoked by react-leaflet when the Leaflet map instance is ready.
        // In Strict Mode, this might be called twice if the component re-mounts.
        if (mapRef.current === null) {
          // Only assign the mapInstance if our ref is currently null (i.e., no active map).
          // This guard is essential for Strict Mode's double mount behavior.
          mapRef.current = mapInstance;
          // console.log("Map instance assigned to LocationSelectorMapComponent's mapRef:", mapInstance);
        } else {
          // This case might happen if whenCreated is called again without a proper unmount/cleanup cycle
          // or on an HMR update where the ref wasn't nulled.
          // console.warn("whenCreated called but mapRef.current was not null. Potential issue or HMR reload.", mapRef.current, mapInstance);
          // We typically don't want to reassign if mapRef.current already exists,
          // as it should be the already initialized map. The cleanup should handle the old one.
          // However, if mapInstance is different and old one was not cleaned, this can be an issue.
          // For safety, if a new map instance is created and the ref wasn't null,
          // it might indicate a problem, but we will prefer the new instance
          // if it's different from the one in the ref.
          // However, the primary fix is the cleanup setting mapRef.current to null.
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
