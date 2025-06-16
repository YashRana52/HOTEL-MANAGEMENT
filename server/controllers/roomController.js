//Api to create a new room for a hotel

import { v2 as cloudinary } from "cloudinary";
import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";

export const createRoom = async (req, res) => {
    try {

        const { roomType, pricePerNight, amenties } = req.body;
        const hotel = await Hotel.findOne({ owner: req.auth.userId })

        if (!hotel) return res.json({
            success: false, message: "No Hotel found"
        })

        //upload images to cloudinary

        const uploadImages = req.files.map(async (file) => {
            const response = await cloudinary.uploader.upload(file.path)
            return response.secure_url;
        })

        //wait for all uploads to complete
        const images = await Promise.all(uploadImages)

        await Room.create({
            hotel: hotel._id,
            roomType,
            pricePerNight: +pricePerNight,
            amenities: JSON.parse(amenties),
            images
        })
        res.json({
            success: true,
            message: "Room created successfully"
        })







    } catch (error) {
        res.json({
            successs: false,
            message: error.message
        })

    }

}


//Api to get all room for a hotel

// @ts-ignore
export const getRoom = async (req, res) => {
    try {

        const rooms = await Room.find({ isAvailable: true }).populate({
            path: 'hotel',
            populate: {
                path: 'owner',
                select: 'image'

            }
        }).sort({ createdAt: -1 })
        res.json({
            success: true, rooms
        })

    } catch (error) {
        res.json({
            successs: false,
            message: error.message
        })

    }

}

//Api to get room of a specific  hotel

export const getOwnerRooms = async (req, res) => {
    try {
        const hotelData = await new Hotel({ owner: req.auth.userId })
        const rooms = await Room.find({ hotel: hotelData._id.toString() }).populate("hotel")
        res.json({
            success: true, rooms
        })

    } catch (error) {
        res.json({
            successs: false,
            message: error.message
        })

    }

}

//Api to toggle availability of a room

export const toggleRoomAvailability = async (req, res) => {
    try {
        const { roomId } = req.body;
        const roomData = await Room.findById(roomId)
        // @ts-ignore
        roomData.isAvailable = !roomData.isAvailable

        // @ts-ignore
        await roomData.save()
        res.json({
            success: true, message: "Room availability Updated"
        })



    } catch (error) {
        res.json({
            successs: false,
            message: error.message
        })

    }

}