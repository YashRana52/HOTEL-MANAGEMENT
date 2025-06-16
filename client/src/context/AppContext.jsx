import { useAuth, useUser } from "@clerk/clerk-react";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const currency = import.meta.env.VITE_CURRENCY || "₹";
    const navigate = useNavigate();
    const { user } = useUser();
    const { getToken } = useAuth();

    const [isOwner, setIsOwner] = useState(false);
    const [showHotelReg, setShowHotelReg] = useState(false);
    const [searchedCities, setSearchCities] = useState([]);

    const fetchUser = async () => {
        try {
            const token = await getToken();

            const { data } = await axios.get('/api/user', { headers: { Authorization: `Bearer ${await getToken()}` } })


            if (data.success) {
                setIsOwner(data.role === "hotelOwner");
                setSearchCities(data.recentSearchedCities);
            } else {
                setTimeout(fetchUser, 5000);
            }
        } catch (error) {
            toast.error("Failed to fetch user");
            console.error(error);
        }
    };

    useEffect(() => {
        if (user) {
            fetchUser();
        }
    }, [user]);

    const value = {
        currency,
        navigate,
        user,
        getToken,
        isOwner,
        setIsOwner,
        showHotelReg,
        setShowHotelReg,
        searchedCities,
        setSearchCities,
        axios
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
