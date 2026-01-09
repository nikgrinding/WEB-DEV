import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { AppContext } from "./AppContext";

axios.defaults.withCredentials = true;

export const AppContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);

    const getUserData = useCallback(async () => {
        try {
            const { data } = await axios.get(backendUrl + "/api/v1/user/data");
            if (data.success) {
                setUserData(data.userData);
            }
        } catch (error) {
            console.error(error);
            setUserData(null);
        }
    }, [backendUrl]);

    const getAuthState = useCallback(async () => {
        try {
            const { data } = await axios.get(backendUrl + "/api/v1/auth/is-authenticated");
            if (data.success) {
                setIsLoggedIn(true);
                getUserData();
            }
        } catch {
            setIsLoggedIn(false);
        }
    }, [backendUrl, getUserData]);

    useEffect(() => {
        // Check auth state on mount - this is a valid use case
        // eslint-disable-next-line react-hooks/set-state-in-effect
        getAuthState();
    }, [getAuthState]);

    const value = { backendUrl, isLoggedIn, setIsLoggedIn, userData, setUserData, getUserData };
    return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
};
