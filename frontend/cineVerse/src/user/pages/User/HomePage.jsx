import UserSectionButton from "../User/../../components/Users/UserSectionButton"
import UserLoginToggleEffect from "../User/../../components/Users/UserLoginToggleEffect"
import { propContext } from "../User/../../context/User/contextApi"
import { useContext, useState, useEffect } from "react"

function HomePage() {
    const { isLoggedIn, setTopProfileIconToggleButton, topProfileIconToggleButton } = useContext(propContext)
    const [logOutMessage, setLogOutMessage] = useState(null)

    const SetUserToggleMode = () => {
        setTopProfileIconToggleButton((prev) => !prev)
    }

    useEffect(() => {
        if (logOutMessage !== null) {
            setTimeout(() => {
                setLogOutMessage(null)
            }, 3000);
        }
    }, [logOutMessage])

    return (
        <div className="bg-[#F8FAFC] ">
            <header className="h-18 w-full bg-[#FFFFFF] flex justify-between items-center px-4 border border-red-500">
                <div>
                    <h1 className="text-3xl text-[#0F172A] font-extrabold tracking-tight">
                        CineVerse
                    </h1>
                </div>

                <div className="flex items-center gap-4">

                    <div className="flex items-center justify-center w-10 h-10 text-2xl cursor-pointer">
                        🔔
                    </div>

                    <div>
                        <div className="flex items-center justify-center w-10 h-10 text-2xl border border-gray-300 rounded-full cursor-pointer"
                            onClick={() => SetUserToggleMode()}>
                            <h1>👤</h1>
                        </div>
                        {topProfileIconToggleButton && <div className="relative">
                            <UserLoginToggleEffect logOutValue={setLogOutMessage} />
                        </div>}
                    </div>
                </div>

            </header>
            <div>
                {logOutMessage !== null && <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-sm">
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
                </div>}
            </div>

            <div className="border h-56 w-full mt-2">
                <h1>Hero section will be build later </h1>
            </div>
            <div className="border border-red-500 mt-2">
                <div>
                    <h1>Trending Section</h1>
                </div>
                <div>
                    <h1>This is the part of the tending section it will build later</h1>
                </div>
            </div>
            <div className="border border-blue-500 mt-2">
                <div>
                    <h1>Current Streaming</h1>
                </div>
                <div>
                    <h1>This is the part of the current streaming it will build later</h1>
                </div>
            </div>
            <div className="border border-green-500 mt-2">
                <div>
                    <h1>Upcoming Section</h1>
                </div>
                <div>
                    <h1>This is the upcoming section and it will be build later</h1>
                </div>
            </div>
            <footer className="fixed bottom-0 left-0 w-full h-20 bg-white border-t border-blue-500 shadow-lg rounded-lg">
                <UserSectionButton />
            </footer>

            {/* <div>
                <h1>Hero Section here</h1>
            </div>

            <div>
                <h1>Buttons section here</h1>
            </div> */}
        </div>
    )
}

export default HomePage