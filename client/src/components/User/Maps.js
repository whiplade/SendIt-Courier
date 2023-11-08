import React, { useState } from "react";
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  DirectionsRenderer,
} from "@react-google-maps/api";
import BeatLoader from "react-spinners/BeatLoader";
import { useNavigate } from "react-router-dom";

function Map({ formData }) {
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API,
    libraries: ["places"],
  });

  const center = {
    lat: -1.2921,
    lng: 36.8219,
  };

  const navigate = useNavigate();

  async function calculateRoute() {
    if (formData.pickup_location === "" || formData.destination === "") {
      return;
    }

    const directionsService = new window.google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: String(formData.pickup_location),
      destination: String(formData.destination),
      travelMode: window.google.maps.TravelMode.DRIVING,
    });

    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);

    navigate('/user/track');
  }

  if (!isLoaded) {
    return (
      <div className="flex h-screen items-center justify-center">
        <BeatLoader
          loading={!isLoaded}
          color="#4F46E5"
          size={100}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
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
      <div className="flex justify-center mt-4">
        <button onClick={calculateRoute} className="calcroute">
          Calculate Route
        </button>
      </div>
    </>
  );
}

export default Map;
