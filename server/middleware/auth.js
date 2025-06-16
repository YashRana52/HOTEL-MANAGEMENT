import User from "../models/user.js";

export const protect = async (req, res, next) => {
    const { userId } = await req.auth();

    if (!userId) {
        return res.status(401).json({
            success: false,
            message: "Not authorized",
        });
    }

    const user = await User.findOne({ clerkId: userId });

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found in database",
        });
    }

    req.user = user;
    next();
};
