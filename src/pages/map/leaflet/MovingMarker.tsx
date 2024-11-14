import { useRef, useState } from "react";

import L from "leaflet";
import { Marker, useMapEvent } from "react-leaflet";

export function MovingMarker() {
  const markerRef = useRef(null);
  const [position, setPosition] = useState<L.LatLngExpression | [0, 0]>([0, 0]);

  const customMarker = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [17, 46]
  });

  useMapEvent("click", (e) => {
    setPosition(e.latlng as L.LatLngExpression);
  });

  return (
    <Marker
      ref={markerRef}
      position={position as L.LatLngExpression}
      icon={customMarker}
    />
  );
};