import axios from "axios";
import { useEffect, useState } from "react";
import { GiFullMotorcycleHelmet } from "react-icons/gi";
import { IoMdPeople } from "react-icons/io";
import { RiMotorbikeFill } from "react-icons/ri";

const Totaldata = () => {
    const [staff, setStaff] = useState(0);
    const [driver, setDriver] = useState(0);
    const [vehicle, setVehicle] = useState(0);

    const getAllVehicles = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/staffVehicle/all');
            setVehicle(response.data.vehicles.length);
        } catch (error) {
            console.error("Error fetching vehicles:", error);
        }
    };

    const getAllUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/user/getAll');
            const users = response.data.response || [];

            let staffCount = 0;
            let driverCount = 0;

            users.forEach(user => {
                if (user.role === 'staff') staffCount++;
                if (user.role === 'driver') driverCount++;
            });

            setStaff(staffCount);
            setDriver(driverCount);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    useEffect(() => {
        getAllUsers();
        getAllVehicles();
    }, []);

    return (
        <div className="grid grid-cols-1 items-center gap-6 gap-y-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-3 absolute top-[90px] left-[10px] md:top-[50px] md:left-[270px]">
            
                <div className="card flex flex-col justify-between cursor-pointer min-h-28 rounded-md shadow-md bg-gray-600 text-black hover:bg-gray-700 transition-colors">
                    <div className="mb-2 flex items-center justify-between">
                        <span>Total Deliver Partners</span>
                        <GiFullMotorcycleHelmet size='32'/>
                    </div>
                    <div className="text-2xl font-bold">{driver}</div>
                </div>
            

           
                <div className="card flex flex-col justify-between cursor-pointer min-h-28 rounded-md shadow-md bg-gray-600 text-black hover:bg-gray-700 transition-colors">
                    <div className="mb-2 flex items-center justify-between">
                        <span>Available Vehicles</span>
                        <RiMotorbikeFill size='32'/>
                    </div>
                    <div className="text-2xl font-bold">{vehicle}</div>
                </div>
            

           
                <div className="card flex flex-col justify-between cursor-pointer min-h-28 rounded-md shadow-md bg-gray-600 text-black hover:bg-gray-700 transition-colors">
                    <div className="mb-2 flex items-center justify-between">
                        <span>Available Staffs</span>
                        <IoMdPeople size='32'/>
                    </div>
                    <div className="text-2xl font-bold">{staff}</div>
                </div>
            
        </div>
    );
};

export default Totaldata;