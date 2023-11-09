import React from "react";
import NavBar from "../components/NavBar";
import AdminAllParcels from "./AdminAllParcels";
import { useParams } from "react-router-dom"

function AdminSingleOrder() {
  let { id } = useParams();
  return (
    <div>
      <NavBar />
      <AdminAllParcels id={id} />
    </div>
  );
}

export default AdminSingleOrder;

