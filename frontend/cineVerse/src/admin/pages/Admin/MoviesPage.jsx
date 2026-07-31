import React from "react"
import { useState, useEffect } from "react"
import getAllActiveMovie from "../../services/Admin/getAllActiveMovie.js"
import { useNavigate } from "react-router-dom"
import AdminTopBar from "../../components/Admin's/AdminTopBar.jsx"
import AdminMenuOption from "../../components/Admin's/AdminMenuOption.jsx"
import { useLocation } from "react-router-dom"
import inActiveMovie from "../../services/Admin/getAlllInactiveMovie.js"
import CompleteMovies from "../../components/Admin's/CompleteMovies.jsx"

function MoviesPage() {

    const navigate = useNavigate()
    const location = useLocation()

    const [movieTitle, setMovieTitile] = useState("")
    const [activeMovieData, setActiveMovieData] = useState([])
    const [inActiveMovieData, setInActiveMovieData] = useState([])
    const [menuButton, setMenuButton] = useState(false)
    const [totalActiveMovie, setTotalActiveMovie] = useState(0)
    const [totalInActiveMovie, setTotalInActiveMovie] = useState(0)
    const [movieDeleteMessage, setMovieDeleteMessage] = useState("")
    const [movieFilterOption, setMovieFilterOption] = useState("Both")



    const AddNewMovie = () => {
        navigate("/admin/panel/movies/create-movie")
    }

    useEffect(() => {
        const moviesDetails = async () => {
            try {
                const movieDetailsResponse = await getAllActiveMovie(movieFilterOption)
                console.log("Movie details recived are: ", movieDetailsResponse.data.movies.length)
                if (movieDetailsResponse) {
                    setActiveMovieData(movieDetailsResponse.data.movies)
                    setTotalActiveMovie(movieDetailsResponse.data.movies.length)
                }
            } catch (error) {
                console.log("Error from backend while fetching movie details is: ", error)
                setActiveMovieData({})
            }
        }
        moviesDetails()
    }, [movieFilterOption])

    useEffect(() => {
        const movieDetails = async () => {
            try {
                const inActiveMovieDetailsResponse = await inActiveMovie(movieFilterOption)
                console.log("InActive Movie details recived are: ", inActiveMovieDetailsResponse.data.movies)
                if (inActiveMovieDetailsResponse) {
                    setInActiveMovieData(inActiveMovieDetailsResponse.data.movies)
                    setTotalInActiveMovie(inActiveMovieDetailsResponse.data.movies.length)
                }
            } catch (error) {
                console.log("Error from backend while fetching movie details is: ", error)
                setInActiveMovieData([])
            }
        }
        movieDetails()
    }, [movieFilterOption])

    useEffect(() => {
        if (location.state?.message) {
            setMovieDeleteMessage(location.state?.message)
            navigate(location.pathname, {
                replace: true,
                state: null
            });
            const timer = setTimeout(() => {
                setMovieDeleteMessage("");
            }, 2000);

            return () => clearTimeout(timer)
        }
    }, [location.state, navigate, location.pathname])


    const SetBothMovieOption = () => {
        console.log("Both straming and theatre button is clicked")
        setMovieFilterOption("Both")
    }

    const SetStreamingMovieOption = () => {
        console.log("Straming option is clicked")
        setMovieFilterOption("Streaming")
    }

    const SetTheatreMovieOption = () => {
        console.log("Theatre filter button is cliccked")
        setMovieFilterOption("Theatre")
    }

    return (
        <>
            <div className="min-h-screen bg-slate-50">

                <div>
                    <AdminTopBar setMenuButton={setMenuButton} menuButton={menuButton} />
                </div>

                <div
                    className={`fixed top-20 right-5 z-[100] transition-all duration-300 ${menuButton
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 -translate-y-3 pointer-events-none"
                        }`}
                >
                    <AdminMenuOption />
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md">

                    <h1 className="text-3xl font-bold text-slate-900">
                        Movies
                    </h1>

                    <p className="mt-2 text-sm text-slate-500">
                        Manage your movie library.
                    </p>

                </div>

                {movieDeleteMessage !== "" && (


                    <div className="fixed top-15 right-1 z-[100]">

                        <div className="inline-flex items-center gap-2 whitespace-nowrap rounded-2xl border border-green-300 bg-green-50 px-4 py-3 shadow-lg">

                            <span className="text-green-600">✅</span>

                            <p className="text-sm font-semibold text-green-700">
                                {movieDeleteMessage}
                            </p>

                        </div>

                    </div>
                )}

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-md">

                    <div className="mb-6 border-b border-slate-200 pb-4">

                        <h2 className="text-xl font-bold text-slate-900">
                            Search Movies
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Search and filter movies by availability.
                        </p>

                    </div>

                    <div className="space-y-6">

                        <div className="relative">

                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-slate-400">
                                🔍
                            </span>

                            <input
                                type="text"
                                placeholder="Search by title..."
                                className="w-full rounded-xl border border-slate-300 bg-slate-50 py-3 pl-12 pr-4 text-sm text-slate-700 placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200"
                            />

                        </div>

                        <div>

                            <h3 className="mb-3 font-semibold text-slate-700">
                                Availability
                            </h3>

                            <div className="flex flex-wrap gap-3">

                                <button
                                    onClick={() => SetTheatreMovieOption()}
                                    className={`rounded-xl px-5 py-2 font-medium transition-all duration-200 ${movieFilterOption === "Theatre"
                                        ? "border border-blue-600 bg-blue-600 text-white shadow-md"
                                        : "border border-slate-300 bg-white text-slate-700 hover:border-blue-300 hover:bg-blue-50"
                                        }`}
                                >
                                    Theatre
                                </button>

                                <button
                                    onClick={() => SetStreamingMovieOption()}
                                    className={`rounded-xl px-5 py-2 font-medium transition-all duration-200 ${movieFilterOption === "Streaming"
                                        ? "border border-blue-600 bg-blue-600 text-white shadow-md"
                                        : "border border-slate-300 bg-white text-slate-700 hover:border-blue-300 hover:bg-blue-50"
                                        }`}
                                >
                                    Streaming
                                </button>

                                <button
                                    onClick={() => SetBothMovieOption()}
                                    className={`rounded-xl px-5 py-2 font-medium transition-all duration-200 ${movieFilterOption === "Both"
                                        ? "border border-blue-600 bg-blue-600 text-white shadow-md"
                                        : "border border-slate-300 bg-white text-slate-700 hover:border-blue-300 hover:bg-blue-50"
                                        }`}
                                >
                                    Both
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

                <div className="my-5 rounded-3xl border border-slate-200 bg-white p-5 shadow-md">

                    <div className="mb-8 flex justify-end">

                        <button
                            onClick={AddNewMovie}
                            className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-sm transition-all duration-200 hover:bg-blue-700 active:scale-95"
                        >
                            + Add Movie
                        </button>

                    </div>

                    <div className="mb-8 border-b border-slate-200 pb-5">

                        <h2 className="text-2xl font-bold text-slate-900">
                            🎬 Movies
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Manage active and inactive movies from one place.
                        </p>

                    </div>

                    <div className="rounded-2xl border border-green-200 bg-green-50 p-5 shadow-sm">

                        <div className="mb-5 flex items-center justify-between border-b border-green-200 pb-4">

                            <div>

                                <h3 className="text-xl font-bold text-green-700">
                                    ✅ Active Movies
                                </h3>

                                <p className="mt-1 text-sm text-green-600">
                                    Currently visible to users.
                                </p>

                            </div>

                            <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
                                Total: {totalActiveMovie}
                            </span>

                        </div>

                        {totalActiveMovie !== 0 ? (

                            <CompleteMovies
                                title="Active Movies"
                                movieData={activeMovieData}
                            />

                        ) : (

                            <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center">

                                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-200 text-3xl">
                                    🎬
                                </div>

                                <h3 className="text-xl font-bold text-slate-800">
                                    No Active Movies
                                </h3>

                                <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
                                    There are currently no active movies available. Add a new movie or
                                    activate an existing one to display it here.
                                </p>

                            </div>

                        )}


                    </div>
                    <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-5 shadow-sm">

                        <div className="mb-5 flex items-center justify-between border-b border-red-200 pb-4">

                            <div>

                                <h3 className="text-xl font-bold text-red-700">
                                    ❌ Inactive Movies
                                </h3>

                                <p className="mt-1 text-sm text-red-600">
                                    InVisible to users
                                </p>

                            </div>

                            <span className="rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-700">
                                Total: {totalInActiveMovie}
                            </span>

                        </div>

                        {totalInActiveMovie !== 0 ? (

                            <CompleteMovies
                                title="InActive Movies"
                                movieData={inActiveMovieData}
                            />

                        ) : (

                            <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-red-300 bg-red-50 px-6 py-12 text-center">

                                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-3xl">
                                    🚫
                                </div>

                                <h3 className="text-xl font-bold text-red-700">
                                    No Inactive Movies
                                </h3>

                                <p className="mt-2 max-w-sm text-sm leading-6 text-slate-600">
                                    There are no inactive movies available at the moment. Movies that
                                    are removed or hidden will appear here.
                                </p>

                            </div>

                        )}
                    </div>

                </div>

            </div >
        </>

    )
}

export default MoviesPage