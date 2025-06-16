import Hotel from '../models/Hotel.js'
import User from '../models/user.js'


export const registerHotel = async (req, res) => {
    try {
        const { name, address, contact, city } = req.body;
        const owner = req.user._id

        //check if User already registerd

        const hotel = await Hotel.findOne({ owner })
        if (hotel) {

            return res.json({
                successs: false,
                message: "Hotel Already Registered"
            })
        }
        await Hotel.create({ name, address, contact, city, owner })

        await User.findByIdAndUpdate(owner, { role: "hotelOwner" })
        res.json({
            successs: true,
            message: "Hotel Register Successfully"
        })

    } catch (error) {
        res.json({
            successs: false,
            message: error.message
        })

    }
}

