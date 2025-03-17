import React, { useState, useRef } from 'react';
import Webcam from "react-webcam";

const Register = () => {
    const webcamRef = useRef(null);
    const [isCameraOpen, setIsCameraOpen] = useState({ aadhar: false, pan: false, license: false, photo: false });
    const [formData, setFormData] = useState({
        name: '',
        phoneNumber: '',
        alternateNumber: '',
        address: '',
        photo: '',
        bankDetails: { bankName: '', accountNumber: '', ifsc: '', bankAddress: '' },
        documents: { aadhar: '', pan: '', license: '', passbook: '' },
        hasVehicle: false,
        vehicleDetails: { scooterPhotos: ['', '', ''], model: '', numberPlate: '', insurance: '', rc: '', emissionTest: '' },
        agreeToTerms: false
    });

    const validatePhoneNumber = (phone) => {
        return /^[0-9]{10,15}$/.test(phone);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const keys = name.split('.');
        const newValue = type === 'checkbox' ? checked : value;

        if ((name === 'phoneNumber' || name === 'alternateNumber') && !validatePhoneNumber(value)) {
            return;
        }

        setFormData((prevData) => {
            if (keys.length > 1) {
                return {
                    ...prevData,
                    [keys[0]]: { ...prevData[keys[0]], [keys[1]]: newValue }
                };
            }
            return { ...prevData, [name]: newValue };
        });
    };

    const capturePhoto = (field) => {
        if (webcamRef.current) {
            const imageSrc = webcamRef.current.getScreenshot();
            if (imageSrc) {
                setFormData((prevData) => ({ ...prevData, [field === 'photo' ? 'photo' : 'documents']: { ...prevData.documents, [field]: imageSrc } }));
                setIsCameraOpen((prev) => ({ ...prev, [field]: false })); // Close camera after capturing
            } else {
                alert("Failed to capture image. Please try again.");
            }
        }
    };

    const handleFileUpload = (event, field) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData((prevData) => ({ ...prevData, [field === 'photo' ? 'photo' : 'documents']: { ...prevData.documents, [field]: reader.result } }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.agreeToTerms) {
            alert('Please agree to the terms and conditions.');
            return;
        }
        if (!validatePhoneNumber(formData.phoneNumber)) {
            alert('Invalid phone number. It must be between 10 to 15 digits.');
            return;
        }
        console.log('Form Data:', formData);
        alert('Form submitted! Wait until verification. We will reach out to you soon.');
    };

    return (
        <div className="flex items-center justify-center bg-gray-100">
            <div className="max-w-lg w-full p-6 bg-white shadow-lg rounded-lg">
                <form onSubmit={handleSubmit} className="space-y-8">
                    <h2 className="text-2xl font-bold text-center">Registration Form</h2>
                    
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <label className="block font-semibold">Name</label>
                            <input type="text" name="name" placeholder="Enter your name" onChange={handleChange} required className="w-full p-2 mt-2 border rounded" />
                        </div>

                        <div>
                            <label className="block font-semibold">Phone Number</label>
                            <input type="text" name="phoneNumber" placeholder="Enter phone number" onChange={handleChange} required className="w-full p-2 mt-2 border rounded" />
                        </div>

                        <div>
                            <label className="block font-semibold">Alternate Number</label>
                            <input type="text" name="alternateNumber" placeholder="Enter alternate number" onChange={handleChange} required className="w-full p-2 mt-2 border rounded" />
                        </div>

                        <div>
                            <label className="block font-semibold">Address</label>
                            <input type="text" name="address" placeholder="Enter address" onChange={handleChange} required className="w-full p-2 mt-2 border rounded" />
                        </div>
                    </div>

                    {/* Document Upload Fields */}
                    {['photo', 'aadhar card', 'pan card', 'driving license'].map((field) => (
                        <div key={field} className="grid grid-cols-1 gap-4 mt-4">
                            <label className="block font-semibold capitalize">{field}</label>
                            {isCameraOpen[field] && (
                                <Webcam
                                    audio={false}
                                    ref={webcamRef}
                                    screenshotFormat="image/jpeg"
                                    className="w-full border rounded"
                                    videoConstraints={{ facingMode: "user" }}
                                />
                            )}
                            <div className="flex gap-2 mt-2">
                                {!isCameraOpen[field] ? (
                                    <button type="button" onClick={() => setIsCameraOpen((prev) => ({ ...prev, [field]: true }))} className="flex-1 p-2 bg-black text-white rounded hover:bg-gray-600">Open Camera</button>
                                ) : (
                                    <button type="button" onClick={() => capturePhoto(field)} className="flex-1 p-2 bg-black text-white rounded hover:bg-gray-600">Capture Photo</button>
                                )}
                                <label className="flex-1 p-2 bg-gray-200 text-center rounded cursor-pointer hover:bg-gray-300">
                                    Select from Device
                                    <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, field)} className="hidden" />
                                </label>
                            </div>
                        </div>
                    ))}
                    
                    <div className="mb-4">
                        <label className="flex items-center space-x-2">
                            <input type="checkbox" name="hasVehicle" onChange={handleChange} className="h-4 w-4" />
                            <span>Do you own a vehicle?</span>
                        </label>
                    </div>
                    
                    {formData.hasVehicle && (
                    <div className="space-y-6">
                        <div className="mb-4">
                            <input
                                type="text"
                                name="vehicleNumber"
                                placeholder="Enter vehicle number"
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>

                        <div className="mb-4">
                            <input
                                type="text"
                                name="vehicleDetails.rc"
                                placeholder="Enter Registration Certificate (RC)"
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>

                        <div className="mb-4">
                            <input
                                type="text"
                                name="vehicleDetails.insurance"
                                placeholder="Enter Insurance details"
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>

                        <div className="mb-4">
                            <input
                                type="text"
                                name="vehicleDetails.emissionTest"
                                placeholder="Enter Emission Test details"
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                    </div>
                    )}

                    <h3 className="text-xl font-semibold">Bank Details</h3>
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <label className="block font-semibold">Bank Name</label>
                            <input type="text" name="bankDetails.bankName" placeholder="Bank Name" onChange={handleChange} required className="w-full p-2 mt-2 border rounded" />
                        </div>

                        <div>
                            <label className="block font-semibold">Account Number</label>
                            <input type="text" name="bankDetails.accountNumber" placeholder="Account Number" onChange={handleChange} required className="w-full p-2 mt-2 border rounded" />
                        </div>

                        <div>
                            <label className="block font-semibold">IFSC Code</label>
                            <input type="text" name="bankDetails.ifsc" placeholder="IFSC Code" onChange={handleChange} required className="w-full p-2 mt-2 border rounded" />
                        </div>

                        <div>
                            <label className="block font-semibold">Bank Address</label>
                            <input type="text" name="bankDetails.bankAddress" placeholder="Bank Address" onChange={handleChange} required className="w-full p-2 mt-2 border rounded" />
                        </div>
                    </div>

                    {/* Terms and Conditions checkbox */}
                    <div className="mb-6">
                        <label className="flex items-center space-x-2">
                            <input type="checkbox" name="agreeToTerms" onChange={handleChange} required className="h-4 w-4" />
                            <span>By registering, you agree to our terms and conditions.</span>
                        </label>
                    </div>
                    
                    {/* Conditionally render the button */}
                    {formData.agreeToTerms && (
                        <button 
                            type="submit" 
                            disabled={!formData.agreeToTerms} 
                            className="w-full p-2 bg-black text-white rounded hover:bg-gray-600"
                        >
                            Submit
                        </button>
                    )}
                </form>
            </div>
        </div>
    );
};

export default Register;
