import { useEffect, useState } from "react";

export const useGeoLocation = () => {
  const [location, setLocation] = useState({
    loaded: false,
    zoomLevel: 18,
    coordinates: { lat: 0, lng: 0 },
    error: { code: 0, message: "" },
  });

  const onSuccess = (location: any) => {
    setLocation({
      loaded: true,
      zoomLevel: 18,
      coordinates: {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      },
      error: { code: 0, message: "" }
    });
  };

  const onError = (error: any) => {
    setLocation({
      loaded: true,
      zoomLevel: 18,
      error: {
        code: error.code,
        message: error.message,
      },
    } as any);
  };

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      onError({
        code: 0,
        message: "Geolocation not supported",
      });
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, []);

  return location;
};