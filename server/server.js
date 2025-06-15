import express from 'express'
import "dotenv/config"
import cors from 'cors'
import connectDb from './configs/db.js'
import { clerkMiddleware } from '@clerk/express'
import clearkWebHooks from './controllers/clerkWebHooks.js'


connectDb()

const app = express()

app.use(cors()) // allow Cross-Origin Resource Sharing
const PORT = process.env.PORT || 3000


//middleware
app.use(express.json())
app.use(clerkMiddleware())


//api to listen clearn webhooks

app.use("/api/cleark", clearkWebHooks)

// @ts-ignore
app.get('/', (req, res) => {
    return res.send("API is working hai")
})


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
