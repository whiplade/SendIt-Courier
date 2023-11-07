import React, { useEffect, useState } from "react";
import {CheckIcon, TruckIcon, XCircleIcon, ArrowPathIcon,}
from "@heroicons/react/20/solid";
import { Link, useNavigate } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";

export default function OrderList() {
  const navigate = useNavigate();
  const [parcels, setParcels] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [currentPage] = useState(1);
  const [user] = useState({ id: 1 }); 

  useEffect(() => {
    fetch("/user_parcels", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Include credentials for authentication (cookies)
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to fetch parcel data");
        }
      })
      .then((data) => {
        setParcels(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching parcel data: ", error);
        setLoading(false);
      });
  }, []);
  

  const filteredParcels = parcels.filter((parcel) => parcel.user_id === user.id);
  const parcelPerPage = 5;

  const indexOfLastParcel = currentPage * parcelPerPage;
  const indexOfFirstParcel = indexOfLastParcel - parcelPerPage;
  const filterParcels = filteredParcels.slice(
    indexOfFirstParcel,
    indexOfLastParcel
  );

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
  if (filteredParcels.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="text-center font-bold text-2xl">
          You have no orders.
        </div>
        <div className="text-center font-bold text-xl">
          Go to the{" "}
          <Link to="/" className="text-blue-300">
            homepage
          </Link>{" "}
          to read about us and make an order.
        </div>
      </div>
    );
  }

  function singleOrder(e) {
    e.preventDefault();
    navigate(`/orders/${e.target.id}`);
  }

  return (
    <div className="container mx-auto mt-4">
      <div className="border-b border-gray-200 flex justify-center gap-4 items-center p-4">
        <h1 className="text-3xl font-bold">Your Orders</h1>
        <span>
          <TruckIcon className="h-6 w-7 text-yellow-500" />
        </span>
      </div>

      <div className="container mx-auto mt-4">
        {filterParcels.map((parcel) => (
          <div key={parcel.id} className="border-b border-gray-200 py-4">
            <h1
              onClick={singleOrder}
              id={parcel.id}
              className="text-xl underline font-medium leading-6 text-gray-900 mb-2 cursor-pointer"
            >
              {parcel.parcel_name}
            </h1>
            <h1 className="text-lg font-medium leading-6 text-gray-900 mb-2">
              Pick up location: {parcel.pickup_location}
            </h1>
            <h1 className="text-lg font-medium leading-6 text-gray-900 mb-2">
              Destination: {parcel.destination}
            </h1>
            <div className="flex justify-between items-center mb-2">
              <p className="text-gray-500 font-medium">
                Weight: {parcel.weight} Kg(s)
              </p>
              <p className="text-gray-500 font-medium">Price: {parcel.price} KSH</p>
              <div className="text-gray-500 font-medium flex gap-2">
                <span>Status: {parcel.status.status}</span>
                <span className="flex justify-between items-center">
                  {parcel.status.status === "Delivered" && (
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                  )}
                  {parcel.status.status === "In-transit" && (
                    <TruckIcon className="h-5 w-5 text-yellow-500 mr-2" />
                  )}
                  {parcel.status.status === "Cancelled" && (
                    <XCircleIcon className="h-5 w-5 text-red-500 mr-2" />
                  )}
                  {parcel.status.status === "Pending" && (
                    <ArrowPathIcon className="h-5 w-5 text-red-500 mr-2" />
                  )}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
}
