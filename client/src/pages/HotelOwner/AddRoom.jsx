import { assets } from '@/assets/assets';
import Title from '@/components/Title';
import React, { useState } from 'react';

function AddRoom() {
    const [images, setImages] = useState({
        1: null,
        2: null,
        3: null,
        4: null,
    });

    const [input, setInput] = useState({
        roomType: '',
        pricePerNight: 0,
        amenities: {
            'Free Wifi': false,
            'Free BreakFast': false,
            'Room Service': false,
            'Mountain View': false,
            'Pool Access': false,
        },
    });

    return (
        <form className="max-w-4xl mx-auto px-4 py-10 space-y-8">
            <Title
                align="left"
                font="outfit"
                title="Add Room"
                subTitle="Easily add new rooms to your hotel’s listing — include details, pricing, and photos to attract more guests and streamline the booking process."
            />

            {/* Upload Area For Images */}
            <div>
                <p className="text-lg font-semibold text-gray-700 mb-2">Images</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {Object.keys(images).map((key) => (
                        <label
                            htmlFor={`roomImages${key}`}
                            key={key}
                            className="cursor-pointer border rounded-xl overflow-hidden bg-gray-100 hover:opacity-80"
                        >
                            <img
                                src={
                                    images[key]
                                        ? URL.createObjectURL(images[key])
                                        : assets.uploadArea
                                }
                                alt={`Room ${key}`}
                                className="w-full h-32 object-cover"
                            />
                            <input
                                type="file"
                                accept="image/*"
                                id={`roomImages${key}`}
                                hidden
                                onChange={(e) =>
                                    setImages({ ...images, [key]: e.target.files[0] })
                                }
                            />
                        </label>
                    ))}
                </div>
            </div>

            {/* Room Type and Price */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                    <p className="text-gray-700 font-medium mb-1">Room Type</p>
                    <select
                        value={input.roomType}
                        onChange={(e) =>
                            setInput({ ...input, roomType: e.target.value })
                        }
                        className="w-full border border-gray-300 p-2 rounded"
                    >
                        <option value="">Select Room Type</option>
                        <option value="Single Bed">Single Bed</option>
                        <option value="Double Bed">Double Bed</option>
                        <option value="Luxury Room">Luxury Room</option>
                        <option value="Family Suite">Family Suite</option>
                    </select>
                </div>

                <div>
                    <p className="text-gray-700 font-medium mb-1">
                        Price <span className="text-sm text-gray-500">/night</span>
                    </p>
                    <input
                        type="number"
                        placeholder="0"
                        className="border border-gray-300 rounded p-2 w-full"
                        value={input.pricePerNight}
                        onChange={(e) =>
                            setInput({ ...input, pricePerNight: e.target.value })
                        }
                    />
                </div>
            </div>

            {/* Amenities */}
            <div>
                <p className="text-lg font-semibold text-gray-700 mb-2">Amenities</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {Object.keys(input.amenities).map((amenity, index) => (
                        <label key={index} className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id={`amenity${index}`}
                                checked={input.amenities[amenity]}
                                onChange={() =>
                                    setInput({
                                        ...input,
                                        amenities: {
                                            ...input.amenities,
                                            [amenity]: !input.amenities[amenity],
                                        },
                                    })
                                }
                            />
                            <span className="text-gray-600">{amenity}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Submit Button */}
            <div>
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
                >
                    Add Room
                </button>
            </div>
        </form>
    );
}

export default AddRoom;
