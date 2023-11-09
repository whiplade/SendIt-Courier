/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  CheckIcon,
  // TruckIcon,
  XCircleIcon,
  ArrowPathIcon
} from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";

export default function AdminAllParcels() {
  const navigate = useNavigate();
  const [parcels, setParcels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const getParcels = async (page) => {
    try {
      const response = await fetch(`http://127.0.0.1:5555/admin/all_parcels`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      setParcels(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching parcels:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getParcels(currentPage);
  }, [currentPage]);

  const parcelPerPage = 5;
  const totalParcels = parcels.length;

  const indexOfLastParcel = currentPage * parcelPerPage;
  const indexOfFirstParcel = indexOfLastParcel - parcelPerPage;
  const filterParcels = parcels.slice(indexOfFirstParcel, indexOfLastParcel);

  if (loading) {
    return <div className="h-screen">Loading...</div>;
  }

  function singleOrder(e) {
    e.preventDefault();
    // Check if the target is an h1 element
    if (e.target.tagName.toLowerCase() === 'h1') {
      navigate(`/admin-orders/${e.target.id}`);
    }
  }

  return (
    <div>
      <div className="border-b border-gray-200 flex justify-center gap-4 items-center">
        <h1 className="text-3xl font-bold">All Parcels</h1>
        <span>
          {/* <TruckIcon className="h-6 w-7 text-yellow-500" /> */}
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
              Pickup Location: {parcel.pickup_location}
            </h1>
            <h1 className="text-lg font-medium leading-6 text-gray-900 mb-2">
              Destination: {parcel.destination}
            </h1>
            <div className="flex justify-between items-center mb-2">
              <p className="text-gray-500 font-medium">
                Weight: {parcel.weight}
              </p>
              <p className="text-gray-500 font-medium">Price: {parcel.price}</p>
              <div className="text-gray-500 font-medium flex gap-2">
                <span>Status: {parcel.status.status}</span>
                <span className="flex justify-between items-center">
                  {parcel.status.status === "Delivered" && (
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                  )}
                  {/* {parcel.status.status === "In-transit" && (
                    <TruckIcon className="h-5 w-5 text-yellow-500 mr-2" />
                  )} */}
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