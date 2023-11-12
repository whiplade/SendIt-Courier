/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  CheckIcon,
  XCircleIcon,
  ArrowPathIcon,
  ArrowLeftIcon
} from "@heroicons/react/20/solid";
import { Link, useNavigate } from "react-router-dom";
import "../CSS/AdminAllParcels.css";

export default function AdminAllParcels() {
  const navigate = useNavigate();
  const [parcels, setParcels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const getParcels = async (page) => {
    try {
      const access_token = localStorage.getItem("access_token");

      const response = await fetch(`http://127.0.0.1:5555/admin/all_parcels?page=${page}`, {
        headers: {
          "Authorization": `Bearer ${access_token}`,
        },
      });

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

  const handleParcelClick = (parcel_id) => {
    console.log(`Clicked on parcel with ID: ${parcel_id}`);
    navigate(`/adminSingleOrder/${parcel_id}`);
  };

  function handleNextPageClick() {
    setCurrentPage((prevPage) => Math.max(prevPage + 1, 1));
  }

  function handleBackClick() {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  }

  return (
    <div>
      <div className="border-b border-gray-200 flex justify-between items-center p-4">
        <div className="flex items-center">
          <ArrowLeftIcon
            className="h-6 w-6 text-gray-500 mr-2 cursor-pointer"
            onClick={handleBackClick}
          />
        </div>
        <div className="flex justify-center mt-4">
          <div className="button-container">
            <button
              onClick={handleBackClick}
              className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
            >
              Back
            </button>
            <button
              onClick={handleNextPageClick}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Next Page
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto mt-4">
        {filterParcels.map((parcel) => (
          <div key={parcel.parcel_id} onClick={() => handleParcelClick(parcel.parcel_id)}>
            <h1>Parcel ID: {parcel.parcel_id} - {parcel.parcel_name}</h1>
            <p>Pickup Location: {parcel.pickup_location}</p>
            <p>Destination: {parcel.destination}</p>
            <div className="flex justify-between items-center">
              <p>Weight: {parcel.weight}</p>
              <p>Price: {parcel.price}</p>
              <div className="status">
                <span>Status: {parcel.status && parcel.status.status}</span>
                <span>
                  {parcel.status && parcel.status.status === "Delivered" && (
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                  )}
                  {parcel.status && parcel.status.status === "Cancelled" && (
                    <XCircleIcon className="h-5 w-5 text-red-500 mr-2" />
                  )}
                  {parcel.status && parcel.status.status === "Pending" && (
                    <ArrowPathIcon className="h-5 w-5 text-red-500 mr-2" />
                  )}
                </span>
              </div>
            </div>
          </div>
        ))}
        <div className="button-container">
          <button
            onClick={handleBackClick}
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          >
            Back
          </button>
          <button
            onClick={handleNextPageClick}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Next Page
          </button>
        </div>
      </div>
    </div>
  );
}
