import UserSectionButton from "../User/../../components/Users/UserSectionButton"
import UserLoginToggleEffect from "../User/../../components/Users/UserLoginToggleEffect"
import { propContext } from "../User/../../context/User/contextApi"
import { useContext, useState, useEffect } from "react"
import streamingMovieDetails from "../../services/User/streamingMovieDetails.js"
import { useNavigate } from "react-router-dom"

function HomePage() {

    const navigate = useNavigate()
    const { isLoggedIn, setTopProfileIconToggleButton, topProfileIconToggleButton } = useContext(propContext)
    const [logOutMessage, setLogOutMessage] = useState(null)
    const [streamingMovieData, setStreamingMovieData] = useState([])

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

    useEffect(() => {
        const movieData = async () => {
            try {
                const movieDetails = await streamingMovieDetails()
                if (movieDetails) {
                    setStreamingMovieData(movieDetails.data)
                    console.log("Streaming movie details is: ", movieDetails.data)
                }
            } catch (error) {
                console.log("Error from backend is: ", error)
                setStreamingMovieData({})
            }
        }
        movieData()
    }, [])

    const MovieCompleteDetailsPage = (id) => {
        console.log("Movie Complete details page is clicked")
        navigate(`/movie/${id}`)
    }

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
            <div className="mt-8">

                <div className="flex items-center justify-between mb-5">

                    <h1 className="text-2xl font-bold text-slate-900">
                        🍿 Current Streaming
                    </h1>

                    <button className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors duration-200">
                        View All →
                    </button>

                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-3xl p-4">

                    <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide pb-2">

                        {streamingMovieData.map((movie, index) => (

                            <div
                                key={index}
                                className="w-44 flex-shrink-0 snap-start rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300"
                            >

                                <div className="h-64 bg-slate-200 overflow-hidden">

                                    <img
                                        src={movie.moviePosterUrl}
                                        alt={movie.title}
                                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                    />

                                </div>

                                <div className="border-t border-slate-200 p-3">

                                    <h2 className="text-base font-bold text-slate-900 line-clamp-1">
                                        {movie.title}
                                    </h2>

                                    <p className="mt-1 text-xs text-slate-500">
                                        Streaming Now
                                    </p>

                                    <button
                                        onClick={() => MovieCompleteDetailsPage(movie._id)}
                                        className="mt-4 w-full rounded-xl bg-red-600 py-2 text-sm font-semibold text-white transition-all duration-200 hover:bg-red-700 active:scale-[0.98]">
                                        ▶ Watch Now
                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>

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
            <div className="border border-green-500 mt-2">
                <div>
                    <h1>Theather Section</h1>
                </div>
                <div>
                    <h1>This is the theather section and it will be build later</h1>
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