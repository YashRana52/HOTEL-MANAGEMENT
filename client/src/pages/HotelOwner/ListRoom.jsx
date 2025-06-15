import { roomsDummyData } from '@/assets/assets';
import Title from '@/components/Title';
import React, { useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';

function ListRoom() {
    const [rooms, setRooms] = useState(roomsDummyData);

    return (
        <div className="px-4 sm:px-6 lg:px-12 py-10 max-w-7xl mx-auto text-gray-800">
            <Title
                align="left"
                font="outfit"
                title="Room Listings"
                subTitle="View, edit, or manage all listed rooms. Keep the information up-to-date to provide the best experience for users."
            />

            <p className="text-lg font-semibold mt-8 mb-4">All Rooms</p>

            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto bg-white rounded-xl border border-gray-200 shadow-md">
                <table className="min-w-[600px] w-full text-sm text-left">
                    <thead className="bg-gray-100 text-gray-600 uppercase text-xs tracking-wide">
                        <tr>
                            <th className="py-3 px-4">Name</th>
                            <th className="py-3 px-4">Facility</th>
                            <th className="py-3 px-4">Price / Night</th>
                            <th className="py-3 px-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {rooms.map((item, index) => (
                            <tr key={index} className="border-t border-gray-100 hover:bg-gray-50 transition">
                                <td className="py-3 px-4 font-medium">{item.roomType}</td>
                                <td className="py-3 px-4">
                                    <div className="flex flex-wrap gap-1">
                                        {item.amenities.map((amenity, i) => (
                                            <span
                                                key={i}
                                                className="bg-gray-200 text-gray-800 text-xs px-2 py-0.5 rounded-full"
                                            >
                                                {amenity}
                                            </span>
                                        ))}
                                    </div>
                                </td>
                                <td className="py-3 px-4 font-semibold text-green-600">
                                    ₹{item.pricePerNight}
                                </td>
                                <td className="py-3 px-4 text-center">
                                    <div className="flex items-center justify-center gap-3">
                                        <button className="text-blue-600 hover:text-blue-800 transition">
                                            <Pencil size={18} />
                                        </button>
                                        <button className="text-red-600 hover:text-red-800 transition">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-6 mt-6">
                {rooms.map((room, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-xl shadow-md border border-gray-200 p-4"
                    >
                        <div className="flex justify-between items-start">
                            <h3 className="text-base font-semibold text-blue-600">{room.roomType}</h3>
                            <div className="flex gap-2">
                                <button className="text-blue-600 hover:text-blue-800">
                                    <Pencil size={18} />
                                </button>
                                <button className="text-red-600 hover:text-red-800">
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                        <div className="mt-2">
                            <p className="text-sm text-gray-500 mb-1">Amenities:</p>
                            <div className="flex flex-wrap gap-1">
                                {room.amenities.map((a, i) => (
                                    <span
                                        key={i}
                                        className="bg-gray-200 text-gray-800 text-xs px-2 py-0.5 rounded-full"
                                    >
                                        {a}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="mt-3">
                            <p className="text-sm font-medium">
                                Price:{' '}
                                <span className="text-green-600 font-semibold">
                                    ₹{room.pricePerNight}
                                </span>{' '}
                                / night
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ListRoom;
