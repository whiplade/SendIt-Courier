import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import Pricing from './components/Pricing';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Landing from './Pages/Landing';
import Map from './components/Map';
import CreateOrder from './Pages/CreateOrder';
import Orders from './Pages/Orders';
import OrderDetails from './Pages/OrderDetails';
import Home from './components/Home';
import AdminAllParcels from "./components/AdminAllParcels";
import AdminSingleOrder from './components/AdminSingleOrder';



const App = () => (
  <Router>
    <div className="App">
      {/* <NavBar /> */}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/map" element={<Map />} />
        <Route path="/createorder" element={<CreateOrder />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/OrderDetails" element={<OrderDetails />} />
        <Route path="/home" element={<Home />} />
        <Route path="/adminAllParcels" element={<AdminAllParcels />} />
        <Route path="/adminSingleOrder/:parcel_id" element={<AdminSingleOrder />} />
      </Routes>

    </div>
  </Router>
);

export default App;
