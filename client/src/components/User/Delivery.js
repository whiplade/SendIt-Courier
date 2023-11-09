import { useRef, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";
import NavUser from './NavUser';

import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";

export default function OrderForm() {
  const [weight, setWeight] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  

  const useCheckout = () => {
    navigate('/user/track');
  };
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

  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [duration, setDuration] = useState("");

  const [formData, setFormData] = useState({
    weight: null,
    description: "",
    recipient_name: "",
    recipient_phone_number: "",
    pickup_location: "",
    destination: "",
    status:"pending",
    present_location:"warehouse"
  });
  const handleWeightChange = (event) => {
    const newWeight = parseFloat(event.target.value);

    setWeight(newWeight);

    if (isNaN(newWeight)) {
      setTotalPrice(0); 
    } else {
      setTotalPrice(newWeight * 3);  
    }
  };

  const [errors, setErrors] = useState({});


  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  

  function createOrder(e) {
    e.preventDefault();

    const payload = {
      weight: formData.weight,
      description: formData.description,  
      recipient_name: formData.recipient_name,
      recipient_phone_number: formData.recipient_phone_number,
      pickup_location: formData.pickup_location,
      destination: formData.destination,
      status: formData.status,
      present_location: formData.present_location
    };
    const access_token = localStorage.getItem("access_token");
    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${access_token}`,
    }

    fetch("http://127.0.0.1:5555/create_order", {
      method: "POST",
      headers: headers,

      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.errors) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your order has been created successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          setTimeout(() => navigate("/Orders"), 1500);
        } else {
          setErrors(data.errors);
        }
      });
  }

  const pickupAutoCompleteRef = useRef(null);
  const destinationAutoCompleteRef = useRef(null);

  const handlePlaceChanged = (fieldName) => {
    const autoCompleteRef =
      fieldName === "pickup_location"
        ? pickupAutoCompleteRef
        : destinationAutoCompleteRef;
    const place = autoCompleteRef.current.getPlace();
    setFormData((prevFormData) => ({
      ...prevFormData,
      [fieldName]: place.formatted_address,
    }));
  };

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


  async function calculateRoute() {
    if (formData.pickup_location === "" || formData.destination === "") {
      return;
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: String(formData.pickup_location),
      destination: String(formData.destination),
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirectionsResponse(results);
    setDuration(results.routes[0].legs[0].duration.text);
  }
  return (
    <>
    <NavUser />
    <div className="deliverycomp">
          <div className="subscribe">
            <form onSubmit={createOrder} className="space-y-3">
                      <input
                        type="text"
                        name="parcel_id"
                        id="parcel_id"
                        value={formData.parcel_id}
                        onChange={handleInputChange}
                        className="subscribe-input"
                        placeholder="Enter parcel name"
                        required
                      />
                      {errors.parcel_id && (
                        <span className="text-xs text-red-600">
                          {errors.parcel_id[0]}!
                        </span>
                      )}
                      <input
                        type="number"
                        name="weight"
                        value={weight}
                        id="weight"
                        onChange={handleWeightChange} 
                        placeholder="Weight"
                        className="subscribe-input"
                        required
                      />
                      {errors.weight && (
                        <span className="text-xs text-red-600">
                          {errors.weight[0]}!
                        </span>
                      )}
                      {formData.price && (
                        <span className="text-xl text-green-600">
                          {`Price: Ksh.${formData.price}`}!
                        </span>
                      )}
                      <Autocomplete
                        onLoad={(autoComplete) =>
                          (pickupAutoCompleteRef.current = autoComplete)
                        }
                        onPlaceChanged={() =>
                          handlePlaceChanged("pickup_location")
                        }
                      >
                        <input
                          type="text"
                          name="pickup_location"
                          id="pickup_location"
                          className="subscribe-input"
                          required
                        />
                      </Autocomplete>
                      {errors.pickup_location && (
                        <span className="text-xs text-red-600">
                          {errors.pickup_location[0]}!
                        </span>
                      )}
                      <Autocomplete
                        onLoad={(autoComplete) =>
                          (destinationAutoCompleteRef.current = autoComplete)
                        }
                        onPlaceChanged={() => handlePlaceChanged("destination")}
                      >
                        <input
                          type="text"
                          name="destination"
                          id="destination"
                          className="subscribe-input"
                          required
                        />
                      </Autocomplete>
                      {errors.destination && (
                        <span className="text-xs text-red-600">
                          {errors.destination[0]}!
                        </span>
                      )}
                      
                      <button
                        onClick={calculateRoute}
                        className="submit-btn"
                      >
                        Calculate route
                      </button>
                      {duration !== "" && (
                        <div className="subscribe-input">
                          <dt>
                            Delivery details
                          </dt>
                          <dd>
                            Duration: {duration}
                          </dd>
                        </div>
                      )}
                      <div className="mt-1">
                        <textarea
                          id="description"
                          name="description"
                          aria-describedby="description"
                          rows={4}
                          className="subscribe-input"
                          value={formData.description}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      {errors.description && (
                        <span className="text-xs text-red-600">
                          {errors.description[0]}!
                        </span>
                      )}
                {/* ... (remaining code from your component) */}
            </form>
            
            </div>
            <div className="card-container">
            <div className="card-content">
            <div className="card-title">Price <span>Range</span></div>
            <div className="values">
              <div>$<span id="first">{totalPrice} Dollars</span></div> 
            </div>
            <small className="current-range">
              Current Range:
              <div>$<span id="third">3$ per Kg</span></div>
            </small>
            <div data-range="#third" data-value-1="#second" data-value-0="#first" className="slider">
              <label className="label-min-value">1</label>
            </div>
            <div>
              <button className="cartbutton" onClick={useCheckout}>CHECKOUT</button>
              <button className="cartbutton" onClick={useCheckout}>TRACK PKG</button>
            </div>
          </div>
            </div>
            {isLoaded && (
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
  )}
          </div>
    </>
  );
}