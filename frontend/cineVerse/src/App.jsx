import { useState, useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { propContext } from './context/User/contextApi'
import refreshToken from './services/User/handleRefreshToken.js'
import handleToken from './services/User/handleTokenRouteService.js'
import HomePage from './pages/User/HomePage'
import LoginPage from './pages/User/LoginPage'
import RegisterPage from './pages/User/RegisterPage'
import ProfilePage from './pages/User/ProfilePage'
import ForgetPassword from './pages/User/ForgetPassword.jsx'
import ResetPassword from './pages/User/ResetPassword.jsx'
import './App.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <HomePage />
      </>
    )
  },
  {
    path: "/login",
    element: (
      <>
        <LoginPage />
      </>
    )
  },
  {
    path: "/register",
    element: (
      <>
        <RegisterPage />
      </>
    )
  },
  {
    path: "/profile",
    element: (
      <>
        <ProfilePage />
      </>
    )
  },
  {
    path: "/forget-password",
    element: (
      <>
        <ForgetPassword />
      </>
    )
  },
  {
    path: "/reset-password",
    element: (
      <>
        <ResetPassword />
      </>
    )
  }
])


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [topProfileIconToggleButton, setTopProfileIconToggleButton] = useState(false)


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
          const generateNewToken = await refreshToken();

          console.log("Refresh token response:", generateNewToken);

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
    <>
      <propContext.Provider value={{ isLoggedIn, setIsLoggedIn, setTopProfileIconToggleButton, topProfileIconToggleButton }} >
        <RouterProvider router={router} />
      </propContext.Provider >
    </>
  )
}

export default App
