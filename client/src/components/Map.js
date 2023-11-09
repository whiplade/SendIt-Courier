/* eslint-disable no-undef */
import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  DirectionsRenderer,
} from "@react-google-maps/api";

function Map() {
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [map, setMap] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY; 

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: googleMapsApiKey, 
    libraries: ["places"],
  });

  const center = {
    lat: -1.2921,
    lng: 36.8219, 
  };

  useEffect(() => {
    if (map) {
      calculateRoute();
    }
  }, [map]);

  function onLoad(mapInstance) {
    setMap(mapInstance);
  }

  if (!isLoaded) {
    return <h2 className="text-2xl text-center mt-2">Loading map..</h2>;
  }

  async function calculateRoute() {
    // Replace these values with your own pickup and destination coordinates
    const pickupLocation = { lat: 40.7128, lng: -74.0060 }; // New York City
    const destination = { lat: 41.8781, lng: -87.6298 }; // Chicago, for example

    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: String(pickupLocation),
      destination: String (destination),
      travelMode: google.maps.TravelMode.DRIVING,
    });

    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  }

  return (
    <>
      <div className="flex justify-evenly mt-8">
        {distance !== "" && (
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">
              Delivery details
            </dt>
            <dd className="mt-1 text-sm text-gray-900">Distance: {distance}</dd>
          </div>
        )}
        {duration !== "" && (
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">
              Delivery details
            </dt>
            <dd className="mt-1 text-sm text-gray-900">Duration: {duration}</dd>
          </div>
        )}
      </div>
      <div className="flow-root m-12 h-96 border rounded-lg">
        <GoogleMap
          onLoad={onLoad}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          center={center}
          zoom={10}
        >
          <Marker position={center} />
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
      </div>
    </>
  );
}

export default Map;
