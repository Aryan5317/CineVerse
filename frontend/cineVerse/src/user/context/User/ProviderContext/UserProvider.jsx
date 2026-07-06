import { useState, useEffect } from 'react';
import { propContext } from '../contextApi';
import { Outlet } from "react-router-dom";
import refreshToken from '../../../services/User/handleRefreshToken';
import handleToken from '../../../services/User/handleTokenRouteService';


function UserProvider() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [topProfileIconToggleButton, setTopProfileIconToggleButton] = useState(false);

    useEffect(() => {
        const verifyLoginUser = async () => {
            try {
                const getUserLoginData = await handleToken();

                console.log("Response from current-user route:", getUserLoginData);

                if (!getUserLoginData) {
                    setIsLoggedIn(false);
                    return;
                }

                setIsLoggedIn(true);
            } catch (error) {
                console.log("Access token expired or invalid:", error);

                try {
                    await refreshToken();

                    const getUserLoginDataAgain = await handleToken();

                    console.log("Response after refreshing token:", getUserLoginDataAgain);

                    if (!getUserLoginDataAgain) {
                        setIsLoggedIn(false);
                        return;
                    }

                    setIsLoggedIn(true);
                } catch (err) {
                    console.log("Unable to refresh token:", err);
                    setIsLoggedIn(false);
                }
            }
        };

        verifyLoginUser();
    }, []);

    return (
        <propContext.Provider
            value={{
                isLoggedIn,
                setIsLoggedIn,
                topProfileIconToggleButton,
                setTopProfileIconToggleButton
            }}
        >
            <Outlet />
        </propContext.Provider>
    );

}

export default UserProvider