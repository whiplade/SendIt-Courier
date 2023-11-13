import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";
import "../CSS/OrderList.css";

function OrderList() {
  const navigate = useNavigate();
  const [parcels, setParcels] = useState([]);
  const [loading, setLoading] = useState(true);

  const viewSingleOrder = (parcel_id) => {
    navigate(`/OrderDetails`);
  };

  useEffect(() => {
    const fetchParcels = async () => {
      try {
        const access_token = localStorage.getItem("access_token");

        if (!access_token) {
          navigate("/login");
          return;
        }

        const response = await fetch("http://127.0.0.1:5555/user_parcels", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
        });

        if (response.status === 401) {
          navigate("/login");
          return;
        }

        if (!response.ok) {
          const responseData = await response.json();
          console.error("Error fetching parcel data: ", responseData);
        } else {
          const data = await response.json();
          console.log("Fetched parcels:", data);
          setParcels(data);
        }
      } catch (error) {
        console.error("Error fetching parcel data: ", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchParcels();
  }, [navigate]);

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

  return (
    <div className="container mx-auto mt-4">
      <div className="border-b border-gray-200 flex justify-center gap-4 items-center p-4">
        <h1 className="text-3xl font-bold">Your Orders</h1>
      </div>

      <div className="container mx-auto mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {parcels.map((parcel) => (
          <div
            key={parcel.parcel_id}
            className="card"
            onClick={() => viewSingleOrder(parcel.parcel_id)}
          >
            <h2 className="text-xl font-medium text-gray-900 mb-2">
              Order ID: {parcel.parcel_id}
            </h2>
            <p>Destination: {parcel.destination}</p>
            <p>Pickup Location: {parcel.pickup_location}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderList;
