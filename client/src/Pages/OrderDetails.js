/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";
import { useRef } from "react";
import { Autocomplete } from "@react-google-maps/api";


let currentLocationMarker;
let newDestinationMarker;


function OrderDetails() {
  const { parcel_id } = useParams();
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [orders] = useState([]);
  const [newDestination, setNewDestination] = useState({ latitude: 0, longitude: 0 }); // State to store the new destination

  const loadGoogleMapsAPI = () => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = initializeMap;
    document.head.appendChild(script);
  };

  

const initializeMap = () => {
  if (window.google && orderDetails.latitude && orderDetails.longitude) {
    const mapOptions = {
      center: { lat: orderDetails.latitude, lng: orderDetails.longitude },
      zoom: 10,
    };

    const map = new window.google.maps.Map(document.getElementById("map"), mapOptions);

    // Assign a marker for the current location (orderDetails.latitude, orderDetails.longitude) to the variable
    currentLocationMarker = new window.google.maps.Marker({
      position: { lat: orderDetails.latitude, lng: orderDetails.longitude },
      map: map,
      title: "Current Location",
    });

    // Add a marker for the new destination (newDestination.latitude, newDestination.longitude)
    if (newDestination.latitude && newDestination.longitude) {
      newDestinationMarker = new window.google.maps.Marker({
        position: { lat: newDestination.latitude, lng: newDestination.longitude },
        map: map,
        title: "New Destination",
      });
      }
    }
  };

  const fetchOrderDetails = async () => {
    try {
      const access_token = localStorage.getItem("access_token");

      if (!access_token) {
        navigate("/login");
        return;
      }

      const response = await fetch(`http://127.0.0.1:5555/user_parcels`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${access_token}`,
        },
      });

      if (response.status === 401) {
        navigate("/login");
        return;
      }

      if (!response.ok) {
        throw new Error(`Failed to fetch order details. Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched order details:", data);

      const selectedOrder = data.find((parcel) => parcel.parceid === parcel_id);

      if (selectedOrder) {
        setOrderDetails(selectedOrder);
      } else {
        throw new Error("Order not found in the response.");
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching order details: ", error);
      setLoading(false);
    }
    loadGoogleMapsAPI();
  };

  useEffect(() => {
    fetchOrderDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parcel_id]);

  useEffect(() => {
    if (orderDetails.latitude && orderDetails.longitude) {
      initializeMap();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderDetails.latitude, orderDetails.longitude]);

  const handleCancel = async () => {
    try {
      const access_token = localStorage.getItem("access_token");

      if (!access_token) {
        navigate("/login");
        return;
      }

      if (!parcel_id) {
        console.error("Invalid parcel_id");
        return;
      }

      const response = await fetch(`http://127.0.0.1:5555/cancel_order/${parcel_id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${access_token}`,
        },
      });

      if (response.status === 401) {
        navigate("/login");
        return;
      }

      if (response.ok) {
        // Handle success (you can redirect to a success page or perform other actions)
        navigate("/success");
      } else {
        // Handle error
        throw new Error(`Failed to cancel order. Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error canceling order: ", error);
    }
  };

  const handleChangeDestination = async () => {
    try {
      const access_token = localStorage.getItem("access_token");
      if (!access_token) {
        navigate("/login");
        return;
      }
      if (!parcel_id) {
        console.error("Invalid parcel_id");
        return;
      }

      const requestData = { new_destination: newDestination }; // Extract the new destination

      const response = await fetch(`http://127.0.0.1:5555/change_destination/${parcel_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${access_token}`,
        },
        body: JSON.stringify(requestData), // Send only the relevant data
      });

      if (response.status === 401) {
        navigate("/login");
        return;
      }

      if (response.ok) {
        // Refresh the order details or update the UI as needed
        fetchOrderDetails();
      } else {
        // Handle error
        throw new Error(`Failed to change order destination. Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error changing order destination: ", error);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <BeatLoader
          loading={loading}
          color="#4F46E5"
          size={100}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }

  if (!orderDetails || !orderDetails.status) {
    return (
      <div>
        <p>Order details not found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-4">
      <div className="border-b border-gray-200 flex justify-center gap-4 items-center p-4">
        <h1 className="text-3xl font-bold">Order Details</h1>
      </div>

      <div className="container mx-auto mt-4">
        {/* Display a list of orders and allow users to select one */}
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
              <button onClick={() => navigate(`/OrderDetails/${order.id}`)}>
                Order ID: {order.id}
              </button>
            </li>
          ))}
        </ul>
        <h1 className="text-xl font-medium leading-6 text-gray-900 mb-2">
          parcel_id: {orderDetails.parcel_id}
        </h1>
        <h1 className="text-lg font-medium leading-6 text-gray-900 mb-2">
          Pick up location: {orderDetails.pickup_location}
       

        </h1>
        <h1 className="text-lg font-medium leading-6 text-gray-900 mb-2">
          Destination: {orderDetails.destination}
        </h1>
        <div className="flex justify-between items-center mb-2">
          <p className="text-gray-500 font-medium">
            Weight: {orderDetails.weight} Kg(s)
          </p>
          <p className="text-gray-500 font-medium">Price: {orderDetails.price} KSH</p>
        </div>
        <div className="text-gray-500 font-medium">
          Status: {orderDetails.status.status}
        </div>
      </div>

      <div id="map" style={{ width: "100%", height: "300px" }}></div>


      <div>
        <button onClick={handleCancel}>CancelParcel</button>
      </div>

      <div>
        <label htmlFor="statusSelect">Status:</label>
        <select
          id="statusSelect"
          // onChange={(e) => handleChangeStatus(e.target.value)}
          disabled
        >
          <option value="In Transit">In Transit</option>
          <option value="Delivered">Delivered</option>
          <option value="Canceled">Canceled</option>
        </select>
      </div>

      <div>
        <label htmlFor="destinationInput">Change Destination:</label>
        <input
          type="text"
          id="destinationInput"
          value={newDestination}
          onChange={(e) => setNewDestination} // Update the new destination state
        />
           <button onClick={handleChangeDestination}>Change Destination</button>

      </div>

    </div>
  );
}

export default OrderDetails;