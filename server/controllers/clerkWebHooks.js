import User from "../models/user.js";
import { Webhook } from "svix";

const clerkWebHooks = async (req, res) => {
    try {
        const webhookSecret = process.env.CLERK_WEBHOOKS_SECRET;

        if (!webhookSecret) {
            return res.status(500).json({
                success: false,
                message: "CLERK_WEBHOOKS_SECRET is not set in .env",
            });
        }

        const wh = new Webhook(webhookSecret);

        const headers = {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"],
        };

        // ✅ req.body is a Buffer (because of express.raw)
        const payload = wh.verify(req.body, headers);

        const { data, type } = payload;

        const userData = {
            clerkId: data.id,
            email: data.email_addresses[0].email_address,
            username: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
            image: data.image_url,
            recentSearchedCities: [],
        };

        switch (type) {
            case "user.created":
                await User.create(userData);
                break;

            case "user.updated":
                await User.findOneAndUpdate({ clerkId: data.id }, userData);
                break;

            case "user.deleted":
                await User.findOneAndDelete({ clerkId: data.id });
                break;

            default:
                break;
        }

        return res.status(200).json({
            success: true,
            message: "Webhook received and processed",
        });
    } catch (error) {
        console.error("Webhook Error:", error.message);
        return res.status(400).json({
            success: false,
            message: "Webhook verification failed: " + error.message,
        });
    }
};

export default clerkWebHooks;
