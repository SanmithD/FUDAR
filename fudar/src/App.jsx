import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';

import AllVehicles from './Components/AllVehicles.jsx';
import Dashboard from './Components/Dashboard.jsx';
import DriverDetails from './Components/DriverDetails.jsx';
import DriverManagement from './Components/DriverManagement.jsx';
import Drivers from './Components/Drivers.jsx';
import DriverSignIn from './Components/DriverSignIn.jsx';
import DriversList from './Components/DriversList.jsx';
import Login from './Components/Login.jsx';
import MainDashboard from './Components/MainDashboard.jsx';
import PDriver from './Components/PDriver.jsx';
import Register from './Components/Register.jsx';
import Signup from './Components/Signup.jsx';
import VehicleDetail from './Components/VehicleDetail.jsx';
import VehicleManagement from './Components/VehicleManagement .jsx';
import Vehicles from './Components/Vehicles.jsx';

const ProtectedRoute = ({ children }) => {
  const role = localStorage.getItem('role');
  if (role === 'driver') {
    return <Navigate to="/driverPage" replace />;
  }
  return children;
};

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/driverPage" element={<PDriver />} />
      <Route path="/main" element={<MainDashboard />} />
      <Route path="/" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      }>
        <Route path="/DriverSignIn" element={<DriverSignIn />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/driver" element={<Drivers />} />
        <Route path="/vehicles" element={<Vehicles />} />
        <Route path="/vehicle/:id" element={<VehicleDetail />} />
        <Route path="/newDriver" element={<DriverManagement />} />
        <Route path="/driverDetails/:id" element={<DriverDetails />} />
        <Route path="/allDrivers" element={<DriversList />} />
        <Route path="/vehicleManage" element={<VehicleManagement />} />
        <Route path="/allVehicles" element={<AllVehicles />} />
        
       
      </Route>
    </Routes>
  );
}

export default App;