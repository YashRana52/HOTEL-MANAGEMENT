import express from 'express'
import cors from 'cors'
import "dotenv/config"
import connectDb from './configs/db.js'
import { clerkMiddleware } from '@clerk/express'
import clearkWebHooks from './controllers/clerkWebHooks.js'
import userRouter from './routes/userRoutes.js'
import hotelRouter from './routes/hotelRoute.js'
import roomRouter from './routes/roomRoute.js'
import bookingRouter from './routes/bookingRoutes.js'
import cloudinary from './configs/cloudinary.js'
import bodyParser from 'body-parser'

connectDb()

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())

// 🟡 IMPORTANT: Clerk webhook needs raw body
app.use('/api/clerk', bodyParser.raw({ type: "*/*" }))

// ✅ middleware
app.use(express.json())
app.use(clerkMiddleware())

// ✅ webhook route (after raw body)
app.post('/api/clerk', clearkWebHooks)

// test route
app.get('/', (req, res) => {
    res.send("API is working hai")
})

// other routes
app.use('/api/user', userRouter)
app.use('/api/hotels', hotelRouter)
app.use('/api/rooms', roomRouter)
app.use('/api/bookings', bookingRouter)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
