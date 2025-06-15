import User from "../models/user.js";
import { Webhook } from "svix";

const clerkWebHooks = async (req, res) => {
    try {
        // @ts-ignore
        const whook = new Webhook(process.env.CLERK_WEBHOOKS_SECRET);

        const headers = {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"],
        };

        // verify returns the actual payload
        const payload = whook.verify(JSON.stringify(req.body), headers);

        const { data, type } = req.body;
        const userData = {
            _id: data.id,
            email: data.email_addresses[0].email_address,
            username: `${data.first_name} ${data.last_name}`,
            image: data.image_url,
        };

        switch (type) {
            case "user.created":
                await User.create(userData);
                break;
            case "user.updated":
                await User.findByIdAndUpdate(data.id, userData);
                break;
            case "user.deleted":
                await User.findByIdAndDelete(data.id);
                break;
            default:
                break;
        }

        res.json({ success: true, message: "Webhook received and processed" });

    } catch (error) {
        console.error("Webhook Error:", error.message);
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

export default clerkWebHooks;
