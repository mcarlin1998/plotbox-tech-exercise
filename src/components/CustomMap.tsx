import React from "react";
import { Map, Marker } from "@vis.gl/react-google-maps";

//Type check for props
interface CustomMapProps {
  markerLocation: { lat: string; lng: string } | null;
}

const CustomMap = ({ markerLocation }: CustomMapProps) => {
  const defaultLocation = { lat: 51.5074, lng: -0.1278 }; // London coordinates

  //Sets default location if none available as google requires it.
  const location =
    markerLocation && "lat" in markerLocation && "lng" in markerLocation
      ? {
          lat: parseFloat(markerLocation.lat),
          lng: parseFloat(markerLocation.lng),
        }
      : defaultLocation;

  return (
    // Using tailwindcss and render the map based on if location is true
    <div className="h-[300px] sm:h-[400px] md:h-[500px] w-full sm:w-3/4 md:w-1/2 border-2 border-black rounded-[20px]">
      {location && (
        <Map
          style={{ borderRadius: "20px", width: "100%", height: "100%" }}
          defaultZoom={13}
          center={location}
          gestureHandling={"greedy"}
          disableDefaultUI
        >
          <Marker position={location} />
        </Map>
      )}
    </div>
  );
};

export default CustomMap;
