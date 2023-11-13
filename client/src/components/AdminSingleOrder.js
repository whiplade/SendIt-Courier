/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { Autocomplete } from "@react-google-maps/api";
import Swal from "sweetalert2";
import Map from "./Map";

export default function AdminSingleOrder() {
  const { parcel_id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editLocation, setEditLocation] = useState(false);
  const [editStatus, setEditStatus] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const locationRef = useRef(null);
  const [status, setStatus] = useState("");
  

  const fetchData = async (id) => {
    try {
      console.log(`Fetching data for ${id ? 'parcel ' + id : 'all parcels'}...`);
      const url = id ? `http://127.0.0.1:5555/parcel/${parcel_id}` : `http://127.0.0.1:5555/admin/all_parcels`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log("Data:", data);

      setOrder(data);
      setLoading(false);
    } catch (error) {
      console.error(`Error fetching ${id ? 'parcel ' + id : 'all parcels'} details:`, error);
      setLoading(false);
      // Handle the error, you might want to display an error message
    }
  };

  useEffect(() => {
    console.log("Inside useEffect");
    if (parcel_id) {
      fetchData(); // Fetch details for a specific parcel
    } else {
      fetchAllParcels(); // Fetch details for all parcels
    }
  }, [parcel_id]);

  const handlePlaceChanged = () => {
    if (locationRef.current) {
      const place = locationRef.current.getPlace();
      setLocation(place.formatted_address || "");
    }
  };

  const handleUpdateResponse = (field) => (res) => {
    if (res.ok) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `${field.charAt(0).toUpperCase() + field.slice(1)} successfully updated`,
        showConfirmButton: false,
        timer: 1500,
      });
      setEditLocation(false);
      setEditStatus(false);
    } else {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: `Failed to update ${field}`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const cancelOrder = () => {
    Swal.fire({
      title: "Do you want to cancel the order?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        if (order[0]?.status?.id) {
          fetch(`http://127.0.0.1:5555/cancel_order/${parcel_id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((res) => res.json())
            .then((data) => {
              Swal.fire("Order Cancelled!", "", "success");
              // Handle UI update if needed
            })
            .catch((error) => {
              console.error("Error canceling order:", error);
              Swal.fire("Failed to cancel order", "", "error");
            });
        }
      } else if (result.isDenied) {
        Swal.fire("Order not canceled", "", "info");
      }
    });
  };

  const updateLocation = (e) => {
    e.preventDefault();
    const newLocation = locationRef.current.getPlace().formatted_address;
    fetch(`http://127.0.0.1:5555/change_location/${parcel_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ present_location: newLocation }),
    })
      .then((res) => res.json())
      .then(handleUpdateResponse("location"))
      .catch((error) => {
        console.error("Error updating location:", error);
        Swal.fire("Failed to update location", "", "error");
      });
  };

  const updateStatus = (e) => {
    e.preventDefault();
    const newStatus = status;
    fetch(`http://127.0.0.1:5555/change_status/${parcel_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: newStatus }),
    })
      .then((res) => res.json())
      .then(handleUpdateResponse("status"))
      .catch((error) => {
        console.error("Error updating status:", error);
        Swal.fire("Failed to update status", "", "error");
      });
  };

  // Check if order is loaded before rendering
  if (loading) {
    return <div className="h-screen">Loading...</div>;
  }

  if (!order || order.length === 0) {
    return <div>Error: No order data available</div>;
  }

  return (
    <div>
      <div className="border-b border-gray-200 p-5 sm:flex sm:items-center sm:justify-between font-bold text-2xl">
        <h3 className="text-2xl font-medium leading-6 text-gray-900">
          {`${order[0].pickup_location} - to - ${order[0].destination}`}
        </h3>
        <h3 className="text-2xl font-medium leading-9 text-gray-900">
          Parcel ID: {order[0]?.parcel_id}
        </h3>
        <h3 className="text-2xl font-medium leading-9 text-gray-900">
          Status: {order[0]?.status}
        </h3>
      </div>
      <div className="overflow-hidden bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Delivery Information
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            {/* Personal details and recipient. */}
          </p>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-3">
            <div>
              <dt className="text-sm font-medium text-gray-500">Parcel ID</dt>
              <dd className="mt-1 text-sm text-gray-900">{order[0]?.parcel_id}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Weight</dt>
              <dd className="mt-1 text-sm text-gray-900">{order[0].weight}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Description</dt>
              <dd className="mt-1 text-sm text-gray-900">{order[0].description}</dd>
            </div>
            <div>
              {/* Add recipient's name and phone number here */}
              <dt className="text-sm font-medium text-gray-500">Recipient's Name</dt>
              <dd className="mt-1 text-sm text-gray-900">{order[0].recipient_name}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Recipient's Phone Number</dt>
              <dd className="mt-1 text-sm text-gray-900">{order[0].recipient_phone_number}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Status</dt>
              <dd className="mt-1 text-sm text-gray-900">{order[0]?.status}</dd>
            </div>
          </dl>
          <div className="pt-8 flex">
            <button
              onClick={cancelOrder}
              type="button"
              className="items-center rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mr-4"
            >
              Cancel Delivery
            </button>
            <button
              onClick={() => setEditLocation(!editLocation)}
              type="button"
              className="items-center rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mr-4"
            >
              Edit Location
            </button>
            <button
              onClick={() => setEditStatus(!editStatus)}
              type="button"
              className="items-center rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mr-4"
            >
              Edit Status
            </button>
            {isLoaded && editLocation && (
              <form onSubmit={updateLocation} className="flex gap-4">
                <Autocomplete
                  onLoad={(autoComplete) => (locationRef.current = autoComplete)}
                  onPlaceChanged={() => handlePlaceChanged()}
                >
                  <input
                    type="text"
                    name="pickup_location"
                    id="pickup_location"
                    ref={locationRef}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    required
                  />
                </Autocomplete>

                <button
                  type="submit"
                  className="items-center rounded border border-transparent bg-slate-600 px-2.5 py-1 text-xs font-medium text-white shadow-sm hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mr-4"
                >
                  Save
                </button>
              </form>
            )}
            {editStatus && (
              <form onSubmit={updateStatus} className="flex gap-4">
                <select
                  id="status"
                  name="status"
                  autoComplete="status"
                  onChange={(e) => {
                    setStatus(e.target.value);
                  }}
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-6 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                >
                  <option>Pending</option>
                  <option>In-transit</option>
                  <option>Delivered</option>
                  <option>Cancelled</option>
                </select>
                <button
                  type="submit"
                  className="items-center rounded border border-transparent bg-slate-600 px-2.5 py-1 text-xs font-medium text-white shadow-sm hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mr-4"
                >
                  Save
                </button>
              </form>
            )}
          </div>
        </div>
        <Map
          isLoaded={isLoaded}
          pickupLocation={order[0]?.status?.location}
          destination={order[0]?.destination}
          updateMapInfo={() => { }}
        />
      </div>
    </div>
  );
}
