import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";

function OrderDetails() {
  const { parcel_id } = useParams();
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState({});
  const [loading, setLoading] = useState(true);

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

      // Assuming the response is an array of parcels, find the one with the matching parcel_id
      const selectedOrder = data.find((parcel) => parcel.id === parcel_id);

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
  }

  useEffect(() => {
    fetchOrderDetails();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = async () => {
    try {
      const access_token = localStorage.getItem("access_token");
      if (!access_token) {
        navigate("/login");
        return;
      }

      const response = await fetch(`http://127.0.0.1:5555/cancel_order`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${access_token}`,
        },
      });

      if (response.status === 401) {
        navigate("/login");
        return;
      }

      if (!response.ok) {
        throw new Error(`Failed to delete order. Status: ${response.status}`);
      }

      // Redirect to a success page or perform any other necessary action
      navigate("/success");
    } catch (error) {
      console.error("Error deleting order: ", error);
    }
  }


  const handleChangeStatus = async (newStatus) => {
    try {
      const access_token = localStorage.getItem("access_token");
      if (!access_token) {
        navigate("/login");
        return;
      }

      const response = await fetch(`http://127.0.0.1:5555/change_status/${parcel_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${access_token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.status === 401) {
        navigate("/login");
        return;
      }

      if (!response.ok) {
        throw new Error(`Failed to change order status. Status: ${response.status}`);
      }

      // Refresh the order details or update the UI as needed
      fetchOrderDetails();
    } catch (error) {
      console.error("Error changing order status: ", error);
    }
  };

  const handleChangeDestination = async (newDestination) => {
    try {
      const access_token = localStorage.getItem("access_token");
      if (!access_token) {
        navigate("/login");
        return;
      }

      const response = await fetch(`http://127.0.0.1:5555/change_destination/${parcel_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${access_token}`,
        },
        body: JSON.stringify({ new_destination: newDestination }),
      });

      if (response.status === 401) {
        navigate("/login");
        return;
      }

      if (!response.ok) {
        throw new Error(`Failed to change order destination. Status: ${response.status}`);
      }

      // Refresh the order details or update the UI as needed
      fetchOrderDetails();
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
        <h1 className="text-xl font-medium leading-6 text-gray-900 mb-2">
          Order ID: {orderDetails.id}
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
        {/* <div className="text-gray-500 font-medium">
          Status: {orderDetails.status.status}
        </div> */}
      </div>

      <div>
        <button onClick={handleDelete}>Delete Parcel</button>
      </div>

      <div>
        <label htmlFor="statusSelect">Status:</label>
        <select
          id="statusSelect"
          onChange={(e) => handleChangeStatus(e.target.value)}
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
          onChange={(e) => handleChangeDestination(e.target.value)}
        />
      </div>

    </div>
  );
}

export default OrderDetails;
