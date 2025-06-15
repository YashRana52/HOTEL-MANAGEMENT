import Title from '@/components/Title'
import React, { useState } from 'react'
import { assets, userBookingsDummyData } from '@/assets/assets'

function MyBookings() {
    const [bookings] = useState(userBookingsDummyData)

    return (
        <div className="py-28 md:pb-36 md:pt-32 px-4 md:px-16 lg:px-24 xl:px-32 bg-white text-gray-900">
            <Title
                title="My Bookings"
                subTitle="Easily manage your past, current, and upcoming hotel reservations in one place. Plan your trips seamlessly with just a few clicks."
                align="left"
            />

            <div className="max-w-6xl mt-10 w-full">
                {/* Table Header */}
                <div className="hidden md:grid md:grid-cols-[3fr_2fr_1fr] w-full border-b border-gray-300 font-medium text-base pb-2">
                    <div>Hotel</div>
                    <div>Date & Timings</div>
                    <div>Payment</div>
                </div>

                {/* Bookings */}
                {bookings.map((booking) => (
                    <div
                        key={booking._id}
                        className="grid grid-cols-1 md:grid-cols-[3fr_2fr_1fr] w-full border-b border-gray-200 py-6 gap-6 md:gap-0"
                    >
                        {/* Hotel Details */}
                        <div className="flex flex-col md:flex-row gap-4">
                            <img
                                className="w-full md:w-44 h-28 rounded-lg object-cover shadow-sm"
                                src={booking.room.images[0]}
                                alt="hotel"
                            />
                            <div className="flex flex-col justify-between">
                                <h3 className="font-playfair text-lg md:text-2xl font-semibold">
                                    {booking.hotel.name}
                                    <span className="block font-normal text-sm text-gray-600">
                                        {booking.room.roomType}
                                    </span>
                                </h3>
                                <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                                    <img src={assets.locationIcon} alt="location" className="w-4 h-4" />
                                    <span>{booking.hotel.address}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                                    <img src={assets.guestsIcon} alt="guests" className="w-4 h-4" />
                                    <span>Guests: {booking.guests}</span>
                                </div>
                                <p className="mt-1 font-medium text-base text-gray-700">Total: ${booking.totalPrice}</p>
                            </div>
                        </div>

                        {/* Booking Dates */}
                        <div className="flex flex-col justify-center gap-2 md:items-start md:justify-center text-sm text-gray-700">
                            <div>
                                <p className="font-medium">Check-In:</p>
                                <p className="text-gray-500">{new Date(booking.checkInDate).toDateString()}</p>
                            </div>
                            <div>
                                <p className="font-medium">Check-Out:</p>
                                <p className="text-gray-500">{new Date(booking.checkOutDate).toDateString()}</p>
                            </div>
                        </div>

                        {/* Payment Status */}
                        <div className="flex flex-col justify-center items-start md:items-center">
                            <div className="flex items-center gap-2">
                                <span
                                    className={`h-3 w-3 rounded-full ${booking.isPaid ? 'bg-green-500' : 'bg-red-500'
                                        }`}
                                />
                                <p className={`text-sm font-medium ${booking.isPaid ? 'text-green-600' : 'text-red-600'}`}>
                                    {booking.isPaid ? 'Paid' : 'Unpaid'}
                                </p>
                            </div>
                            {
                                !booking.isPaid && (
                                    <button className="px-4 py-1.5 mt-4 text-xs border border-gray-400 rounded-full hover:bg-gray-100 transition-all cursor-pointer">
                                        Pay Now
                                    </button>

                                )
                            }
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MyBookings
