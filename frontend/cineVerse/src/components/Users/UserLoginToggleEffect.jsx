import { Link, useNavigate } from "react-router-dom"
import { useContext, useState } from "react"
import { propContext } from "../../context/User/contextApi"
import logOutService from "../../services/User/logOutService"

function UserLoginToggleEffect({ logOutValue }) {
    const { isLoggedIn, setIsLoggedIn, setTopProfileIconToggleButton } = useContext(propContext)
    const navigate = useNavigate()

    // const [logOutMessage, setLogOutMessage] = useState(null)

    const LoginButtonAction = () => {
        setTopProfileIconToggleButton((prev) => !prev)
    }

    const logOutAction = async () => {
        console.log("Logout button clicked.")

        if (isLoggedIn) {
            try {
                const logOutDataValue = await logOutService()

                console.log("Data received from logout:", logOutDataValue)

                if (logOutDataValue) {
                    setIsLoggedIn(false)
                    logOutValue(true)
                    setTopProfileIconToggleButton((prev) => !prev)

                    setTimeout(() => {
                        navigate("/")
                    }, 2000)
                }
            } catch (error) {
                console.log("Logout error:", error)
                logOutValue(false)
                return
            }
        }
    }

    return (
        <>
            {!isLoggedIn && (
                <div
                    className="absolute right-4 top-16 w-40 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden z-50"
                >
                    <Link
                        className="block px-4 py-3 hover:bg-slate-50 border-b border-gray-100"
                        to="/register"
                    >
                        <h1 className="text-[#0F172A] font-medium">
                            Register
                        </h1>
                    </Link>

                    <Link
                        className="block px-4 py-3 hover:bg-slate-50"
                        to="/login"
                        onClick={LoginButtonAction}
                    >
                        <button className="text-[#0F172A] font-medium"
                            onClick={LoginButtonAction}>
                            Login
                        </button>
                    </Link>
                </div>
            )}

            {isLoggedIn && (
                <div
                    className="absolute right-4 top-16 w-48 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden z-50"
                >
                    <button
                        className="w-full text-left px-4 py-3 text-[#0F172A] font-medium hover:bg-slate-50 border-b border-gray-100 transition-all duration-200"
                    >
                        💎 Subscription
                    </button>

                    <button
                        className="w-full text-left px-4 py-3 text-red-600 font-medium hover:bg-red-50 transition-all duration-200"
                        onClick={logOutAction}
                    >
                        🚪 Logout
                    </button>
                </div>
            )}

            {/* {logOutMessage !== null && <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-sm">
                {logOutMessage ? (
                    <div className="bg-white border border-green-300 rounded-xl shadow-lg px-4 py-3 text-center">
                        <p className="text-green-600 font-semibold">
                            ✅ User logged out successfully.
                        </p>
                    </div>
                ) : (
                    <div className="bg-white border border-red-300 rounded-xl shadow-lg px-4 py-3 text-center">
                        <p className="text-red-600 font-semibold">
                            ❌ Error while logging out.
                        </p>
                    </div>
                )}
            </div>} */}
        </>
    )
}

export default UserLoginToggleEffect