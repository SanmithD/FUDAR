import { Route, Routes } from "react-router-dom";
import "./App.css";
import BookingList from "./Components/BookingList";
import CompleteBooking from "./Components/CompleteBooking";
import CreateBooking from "./Components/CreateBooking";
import CreateVehicle from "./Components/CreateVehicle";
import DriverBookings from "./Components/DriverBookings ";
import DriverCard from "./Components/DriverCard";
import DriverDetails from "./Components/DriverDetails";
import DriverManagement from "./Components/DriverManagement ";
import DriversList from "./Components/DriversList";
import Navbar from "./Components/Navbar";
import UpdateSalary from "./Components/UpdateSalary";
import UpdateVehicle from "./Components/UpdateVehicle";
import VehicleDetails from "./Components/VehicleDetails";
import VehicleList from "./Components/VehicleList ";
import VehicleManagement from "./Components/VehicleManagement ";

function App() {
  return (
    <>
    <Navbar/>
      <Routes>
        <Route path="/" element={<DriverManagement />} />
        <Route path="/staffVehicle" element={<VehicleList />} />
        <Route path="/updateVehicle/:id" element={<UpdateVehicle />} />
        <Route path="/vehicleDetails/:id" element={<VehicleDetails />} />
        <Route path="/createVehicle" element={<CreateVehicle />} />
        <Route path="/driverList" element={<DriversList />} />
        <Route path="/driver/:id" element={<DriverDetails />} />
        <Route path="/driverCard" element={<DriverCard />} />
        <Route path="/bookingList" element={<BookingList />} />
        <Route path="/driverBooking/:driverId" element={<DriverBookings />} />
        <Route path="/create-booking/:vehicleId" element={<CreateBooking />} />
        <Route path="/create-booking" element={<CreateBooking />} />
        <Route path="/update-salary/:driver" element={<UpdateSalary />} />
        <Route path="/vehicleManage" element={<VehicleManagement />} />
        <Route
          path="/complete-booking/:driver"
          element={<CompleteBooking />}
        />
      </Routes>
    </>
  );
}

export default App;
