
"use client";

import React, { useEffect, useRef, memo } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import type L from 'leaflet';
import { Store } from '@/lib/types';
import Link from 'next/link';

// Leaflet's default icon path fix (same as in location-selector-map.tsx)
if (typeof window !== 'undefined') {
  const LGlobal = require('leaflet');
  if (LGlobal.Icon?.Default?.prototype && (LGlobal.Icon.Default.prototype as any)._getIconUrl) {
    delete (LGlobal.Icon.Default.prototype as any)._getIconUrl;
  }
  LGlobal.Icon?.Default?.mergeOptions?.({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  });
}

interface StoreMapInteractiveProps {
  stores: Store[];
  center?: L.LatLngTuple;
  zoom?: number;
}

const StoreMapInteractiveComponent = memo(function StoreMapInteractiveComponent({
  stores,
  center = [-17.7833, -63.1821], // Santa Cruz defaults
  zoom = 13,
}: StoreMapInteractiveProps) {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      scrollWheelZoom={true}
      style={{ height: '100%', width: '100%' }}
      className="rounded-lg z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {stores.map((store) => (
        <Marker key={store.id} position={[store.latitude, store.longitude]}>
          <Popup>
            <div className="text-sm">
              <h3 className="font-bold text-base">{store.name}</h3>
              <p className="my-1">{store.address}</p>
              <p className="text-xs text-muted-foreground mb-2">{store.hours}</p>
              <Link href={`/stores/${store.id}`} className="text-primary hover:underline">
                Ver detalles
              </Link>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
});

StoreMapInteractiveComponent.displayName = 'StoreMapInteractive';
export default StoreMapInteractiveComponent;
