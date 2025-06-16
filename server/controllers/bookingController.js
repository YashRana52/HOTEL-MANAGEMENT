//function to check availability of room

import Booking from "../models/Booking.js"
import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";


const checkAvailability = async ({ checkInDate, checkOutDate, room }) => {
    try {

        const bookings = await Booking.find({
            room,
            checkInDate: { $lte: checkOutDate },
            checkOutDate: { $lte: checkInDate },
        })

        const isAvailable = bookings.length === 0;

        return isAvailable;





    } catch (error) {
        console.log(error.message);


    }
}

//api to check availability of room
//post/api/booking/check-availability

export const checkAvailabilityAPI = async (req, res) => {
    try {

        const { room, checkInDate, checkOutDate } = req.body;
        const isAvailable = await checkAvailability({
            checkInDate, checkOutDate, room

        })
        res.json({
            success: true, isAvailable
        })

    } catch (error) {
        res.json({
            successs: false,
            message: error.message
        })

    }
}

//api to create a new booking
//post/api/booking/book




export const createBooking = async (req, res) => {
    try {
        const { room, checkInDate, checkOutDate, guests } = req.body;
        const user = req.user._id;

        // 1. Check room availability
        const isAvailable = await checkAvailability({
            room,
            checkInDate,
            checkOutDate
        });

        if (!isAvailable) {
            return res.json({
                success: false,
                message: "Room is not available"
            });
        }

        // 2. Fetch room data including hotel reference
        const roomData = await Room.findById(room).populate("hotel");
        if (!roomData) {
            return res.json({
                success: false,
                message: "Room not found"
            });
        }

        let totalPrice = roomData.pricePerNight;

        // 3. Calculate total price based on number of nights
        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);

        const timeDiff = checkOut.getTime() - checkIn.getTime();
        const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));

        totalPrice *= nights;

        // 4. Create Booking
        const booking = await Booking.create({
            user,
            room,
            // @ts-ignore
            hotel: roomData.hotel._id,
            guests: +guests,
            checkInDate,
            checkOutDate,
            totalPrice
        });

        res.json({
            success: true,
            message: "Booking created successfully",
            booking
        });

    } catch (error) {
        console.error("Booking Error:", error);
        res.json({
            success: false,
            message: "Failed to create booking"
        });
    }
};

//api to get all booking for a user

//GET /api/booking/user

export const getUserBookings = async (req, res) => {

    try {
        const user = req.user._id;
        const bookings = await Booking.find({ user }).populate("room hotel").sort({ createdAt: -1 })
        res.json({ success: true, bookings })

    } catch (error) {
        res.json({
            success: false,
            message: "Failed to fetchbooking"
        });

    }

}




export const getHotelBookings = async (req, res) => {
    try {
        // 1. Find the hotel owned by the logged-in user
        const hotel = await Hotel.findOne({ owner: req.auth.userId });

        if (!hotel) {
            return res.json({
                success: false,
                message: "No hotel found"
            });
        }

        // 2. Find all bookings for that hotel
        const bookings = await Booking.find({ hotel: hotel._id })
            .populate("room hotel user")
            .sort({ createdAt: -1 });

        // 3. Total Bookings
        const totalBookings = bookings.length;

        // 4. Total Revenue
        const totalRevenue = bookings.reduce((acc, booking) => acc + booking.totalPrice, 0);

        // 5. Send response
        res.json({
            success: true,
            dashboardData: {
                totalBookings,
                totalRevenue,
                bookings
            }
        });

    } catch (error) {
        console.error("Get Hotel Bookings Error:", error);
        res.json({
            success: false,
            message: "Failed to get hotel bookings"
        });
    }
};




