import express from 'express'
import { protect } from '../middleware/auth.js'
import { registerHotel } from '../controllers/hotelController.js'

const hotelRouter = express.Router()
hotelRouter.post('/', protect, registerHotel)

export default hotelRouter;