import { assets, cities } from '@/assets/assets';
import { useAppContext } from '@/context/AppContext';
import React from 'react';

function HotelReg() {
    const { setShowHotelReg } = useAppContext()
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
            <form className="flex bg-white rounded-xl overflow-hidden shadow-lg w-full max-w-4xl max-md:mx-4">
                {/* Left Image */}
                <img
                    src={assets.regImage}
                    alt="Registration Visual"
                    className="w-1/2 object-cover hidden md:block"
                />

                {/* Right Form */}
                <div className="relative flex flex-col items-center md:w-1/2 w-full px-6 py-8 md:px-10">
                    {/* Close Button */}
                    <img
                        className="absolute top-4 right-4 h-5 w-5 cursor-pointer"
                        src={assets.closeIcon}
                        alt="Close"
                        onClick={() => setShowHotelReg(false)}
                    />

                    <p className="text-2xl font-semibold text-gray-800 mt-6 mb-2">Register Your Hotel</p>
                    <p className="text-sm text-gray-500 mb-6 text-center">Fill in the details to get started</p>

                    {/* Input Fields */}
                    <div className="w-full space-y-4">
                        {/* Hotel Name */}
                        <div>
                            <label htmlFor="name" className="text-sm font-medium text-gray-600">
                                Hotel Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                placeholder="Type here"
                                required
                                className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Contact */}
                        <div>
                            <label htmlFor="phone" className="text-sm font-medium text-gray-600">
                                Phone
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                placeholder="Enter contact number"
                                required
                                className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Address */}
                        <div>
                            <label htmlFor="address" className="text-sm font-medium text-gray-600">
                                Address
                            </label>
                            <input
                                type="text"
                                id="address"
                                placeholder="Enter address"
                                required
                                className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* City Dropdown */}
                        <div>
                            <label htmlFor="city" className="text-sm font-medium text-gray-600">
                                City
                            </label>
                            <select
                                id="city"
                                required
                                className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select City</option>
                                {cities.map((city, index) => (
                                    <option key={index} value={city}>
                                        {city}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="mt-6 w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        Register
                    </button>
                </div>
            </form>
        </div>
    );
}

export default HotelReg;
