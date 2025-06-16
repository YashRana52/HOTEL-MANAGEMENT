// GET /api/user
export const getUserData = async (req, res) => {
    try {
        const { role, recentSearchedCities } = req.user;

        res.json({
            success: true,
            role,
            recentSearchedCities,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// POST /api/user/store-recent-search
export const storeRecentSearchedCities = async (req, res) => {
    try {
        const { recentSearchedCities } = req.body;
        const user = req.user;

        if (!user.recentSearchedCities.includes(recentSearchedCities)) {
            if (user.recentSearchedCities.length < 3) {
                user.recentSearchedCities.push(recentSearchedCities);
            } else {
                user.recentSearchedCities.shift();
                user.recentSearchedCities.push(recentSearchedCities);
            }
        }

        await user.save();

        res.json({
            success: true,
            message: "City added",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
