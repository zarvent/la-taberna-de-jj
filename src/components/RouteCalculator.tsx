
"use client";

import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet-routing-machine';
import { useMap } from 'react-leaflet';

interface RouteCalculatorProps {
  userLocation: L.LatLngTuple;
  storeLocation: L.LatLngTuple;
}

const RouteCalculator: React.FC<RouteCalculatorProps> = ({ userLocation, storeLocation }) => {
  const map = useMap();

  useEffect(() => {
    if (!map || !userLocation || !storeLocation) return;

    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(userLocation[0], userLocation[1]),
        L.latLng(storeLocation[0], storeLocation[1])
      ],
      routeWhileDragging: false,
      show: false, // Do not show the itinerary panel
      addWaypoints: false,
      lineOptions: {
        styles: [{ color: '#007bff', opacity: 0.8, weight: 5 }] // Example: Primary blue color
      }
    }).addTo(map);

    return () => {
      if (map && routingControl) {
        map.removeControl(routingControl);
      }
    };
  }, [map, userLocation, storeLocation]);

  return null;
};

export default RouteCalculator;
