import React, { useEffect, useState } from "react";

function AllOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://127.0.0.1/user_parcels", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch orders. Status: ${response.status}`);
        }

        const data = await response.json();
        setOrders(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders: ", error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (orders.length === 0) {
    return <div>No orders available.</div>;
  }

  return (
    <div>
      <h1>All Orders</h1>
      <ul>
        {orders.map((order) => (
          <li key={order.parcel_id}>
            <p>Parcel ID: {order.parcel_id}</p>
            <p>Recipient: {order.recipient_name}</p>
            <p>Destination: {order.destination}</p>            
            <p>recipient_name: {order.recipient_name}</p>
            <p>recipient_phone_number: {order.destination}</p>
            <p>Weight: {order.weight}</p>
            <p>pickup_location: {order.pickup_location}</p>
            <p>Description: {order.description}</p>
            <p>Status: {order.status}</p>
            <p>Present Location: {order.present_location}</p>

            {/* Add more order details as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AllOrders;
