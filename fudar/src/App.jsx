import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Admin from './Components/Admin.jsx';
import AllVehicles from './Components/AllVehicles.jsx';
import Dashboard from './Components/Dashboard.jsx';
import DriverDetails from './Components/DriverDetails.jsx';
import DriverManagement from './Components/DriverManagement.jsx';
import Drivers from './Components/Drivers.jsx';
import DriverSignIn from './Components/DriverSignIn.jsx';
import DriversList from './Components/DriversList.jsx';
import Login from './Components/Login.jsx';
import LoginAdmin from './Components/LoginAdmin.jsx';
import LoginDrivers from './Components/LoginDrivers.jsx';
import LoginStaff from './Components/LoginStaff.jsx';
import MainDashboard from './Components/MainDashboard.jsx';
import PDriver from './Components/PDriver.jsx';
import Register from './Components/Register.jsx';
import Signup from './Components/Signup.jsx';
import VehicleDetail from './Components/VehicleDetail.jsx';
import VehicleManagement from './Components/VehicleManagement .jsx';
import Vehicles from './Components/Vehicles.jsx';

function App() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<Dashboard />}>
        <Route path="/main" element={<MainDashboard />} />
        <Route path="/LoginDrivers" element={<LoginDrivers />} />
        <Route path="/DriverSignIn" element={<DriverSignIn />} />
        <Route path="/Register" element={<Register />} />

        <Route path="/LoginStaff" element={<LoginStaff />} />
        <Route path="/LoginAdmin" element={<LoginAdmin />} />

        <Route path="/drivers" element={<Drivers />} />
        <Route path="/vehicles" element={<Vehicles />} />
        <Route path="/vehicle/:id" element={<VehicleDetail />} />
        <Route path="/newDriver" element={<DriverManagement />} />
        <Route path="/driverDetails/:id" element={<DriverDetails />} />
        <Route path="/allDrivers" element={<DriversList />} />
        <Route path="/pdriver" element={<PDriver />} />
        <Route path="/vehicleManage" element={<VehicleManagement />} />
        <Route path="/allVehicles" element={<AllVehicles />} />
        <Route path="/admin" element={<Admin />} />
      </Route>
    </Routes>
  );
}

export default App;
