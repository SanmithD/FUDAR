import { GiFullMotorcycleHelmet } from "react-icons/gi";
import { IoMdPeople } from "react-icons/io";
import { RiMotorbikeFill } from "react-icons/ri";

const Totaldata = () => {
    return(
        <>
            <div className="grid grid-cols-1 items-center gap-6 gap-y-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-3  md:absolute md:top-[50px] md:left-[270px]">
                <a href="/">
                    <div className="card flex flex-col justify-between cursor-pointer min-h-28 rounded-md shadow-md bg-gray-600 text-black">
                        <div className="mb-2 flex items-center justify-between">
                            <span>Total Deliver Partners</span>
                            <GiFullMotorcycleHelmet size='32'/>
                        </div>
                        <div className="text-2xl font-bold">360</div>
                    </div>
                </a>

                <a href="/">
                    <div className="card flex flex-col justify-between cursor-pointer min-h-28 rounded-md shadow-md bg-gray-600 text-black">
                        <div className="mb-2 flex items-center justify-between">
                            <span>Available Vehicles</span>
                            <RiMotorbikeFill size='32'/>
                        </div>
                        <div className="text-2xl font-bold">42</div>
                    </div>
                </a>

                <a href="/">
                    <div className="card flex flex-col justify-between cursor-pointer min-h-28 rounded-md shadow-md bg-gray-600 text-black">
                        <div className="mb-2 flex items-center justify-between">
                            <span>Available Staffs</span>
                            <IoMdPeople size='32'/>
                        </div>
                        <div className="text-2xl font-bold">22</div>
                    </div>
                </a>
            </div>
        </>
    );
};

export default Totaldata;