import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";

function OrderList() {
  const navigate = useNavigate();
  const [parcels, setParcels] = useState([]);
  const [loading, setLoading] = useState(true);

  const viewSingleOrder = (parcel_Id) => {
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
            "Authorization": `Bearer ${access_token}`, 
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
        setLoading(false); // Ensure setLoading(false) is called in both success and error cases.
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

      <div className="container mx-auto mt-4">
        {parcels.map((parcel) => (
          <div key={parcel.id} className="border-b border-gray-200 py-4">
            <h1
              onClick={() => viewSingleOrder(parcel.id)}
              className="text-xl underline font-medium leading-6 text-gray-900 mb-2 cursor-pointer"
            >
              Order ID: {parcel.parcel_id}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderList;
