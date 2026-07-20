import React from "react"
import { useState, useEffect } from "react"
import getAllMovie from "../../services/Admin/getAllMovie.js"
import { useNavigate } from "react-router-dom"

function MoviesPage() {

    const navigate = useNavigate()

    const [movieTitle, setMovieTitile] = useState("")
    const [movieData, setMovieData] = useState([])
    const [totalMovie, setTotalMovie] = useState(0)


    const ShowCompleteMovieDetails = (id) => {
        console.log("Movie Details clicked")
        navigate(`/admin/panel/movies/${id}`)

    }

    const AddNewMovie = () => {
        navigate("/admin/panel/movies/create-movie")
    }

    useEffect(() => {
        const moviesDetails = async () => {
            try {
                const movieDetailsResponse = await getAllMovie()
                console.log("Movie details recived are: ", movieDetailsResponse.data.movies.length)
                if (movieDetailsResponse) {
                    setMovieData(movieDetailsResponse.data.movies)
                    setTotalMovie(movieDetailsResponse.data.movies.length)
                }
            } catch (error) {
                console.log("Error from backend while fetching movie details is: ", error)
                setMovieData({})
            }
        }
        moviesDetails()
    }, [])

    return (
        <>
            <div className="space-y-6">

                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md">

                    <h1 className="text-3xl font-bold text-slate-900">
                        Movies
                    </h1>

                    <p className="mt-2 text-sm text-slate-500">
                        Manage your movie library.
                    </p>

                </div>

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

                                <button className="rounded-xl border border-slate-300 bg-white px-5 py-2 font-medium text-slate-700 transition-all duration-200 hover:border-blue-300 hover:bg-blue-50">
                                    Theatre
                                </button>

                                <button className="rounded-xl border border-slate-300 bg-white px-5 py-2 font-medium text-slate-700 transition-all duration-200 hover:border-blue-300 hover:bg-blue-50">
                                    Streaming
                                </button>

                                <button className="rounded-xl border border-slate-300 bg-white px-5 py-2 font-medium text-slate-700 transition-all duration-200 hover:border-blue-300 hover:bg-blue-50">
                                    Both
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

                <div className="flex justify-end">

                    <button
                        onClick={AddNewMovie}
                        className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-sm transition-all duration-200 hover:bg-blue-700 active:scale-95">

                        + Add Movie

                    </button>

                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-md">

                    <div className="mb-6 flex items-center justify-between border-b border-slate-200 pb-4">

                        <h2 className="text-xl font-bold text-slate-900">
                            Movies
                        </h2>

                        <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
                            Total Movie: {totalMovie}
                        </span>

                    </div>

                    <div className="grid gap-6">

                        {movieData.map((movie, index) => {

                            console.log("Movie is:", movie);

                            return (

                                <button
                                    key={index}
                                    onClick={() => ShowCompleteMovieDetails(movie._id)}
                                    className="group w-full overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-400 hover:shadow-xl active:scale-[0.99]"
                                >

                                    <div className="flex flex-col md:flex-row">

                                        <div className="relative md:w-60">

                                            <img
                                                src={movie.moviePosterUrl}
                                                alt={movie.title}
                                                className="h-72 w-full object-cover transition-transform duration-300 group-hover:scale-105 md:h-full"
                                            />

                                            <div className="absolute right-3 top-3 rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white shadow">

                                                {movie.availability}

                                            </div>

                                        </div>

                                        <div className="flex flex-1 flex-col justify-between p-6">

                                            <div>

                                                <div className="flex items-start justify-between gap-4">

                                                    <div>

                                                        <h2 className="text-2xl font-bold text-slate-900 transition-colors duration-200 group-hover:text-blue-600">

                                                            {movie.title}

                                                        </h2>

                                                        <p className="mt-3 line-clamp-3 text-sm leading-7 text-slate-600">

                                                            {movie.description}

                                                        </p>

                                                    </div>

                                                    <div className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold text-yellow-700">

                                                        ⭐ {movie.imdbRating}

                                                    </div>

                                                </div>

                                            </div>

                                            <div className="mt-6 grid grid-cols-2 gap-5 rounded-xl border border-slate-200 bg-slate-50 p-4">

                                                <div>

                                                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">

                                                        Director

                                                    </p>

                                                    <p className="mt-1 font-medium text-slate-800">

                                                        {movie.director}

                                                    </p>

                                                </div>

                                                <div>

                                                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">

                                                        Duration

                                                    </p>

                                                    <p className="mt-1 font-medium text-slate-800">

                                                        {movie.duration}

                                                    </p>

                                                </div>

                                                <div>

                                                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">

                                                        Release Date

                                                    </p>

                                                    <p className="mt-1 font-medium text-slate-800">

                                                        {new Date(movie.releaseDate).toLocaleDateString("en-IN", {
                                                            timeZone: "Asia/Kolkata",
                                                            day: "numeric",
                                                            month: "long",
                                                            year: "numeric",
                                                        })}

                                                    </p>

                                                </div>

                                                <div>

                                                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">

                                                        Created Date

                                                    </p>

                                                    <p className="mt-1 font-medium text-slate-800">

                                                        {new Date(movie.createdAt).toLocaleDateString("en-IN", {
                                                            timeZone: "Asia/Kolkata",
                                                            day: "numeric",
                                                            month: "long",
                                                            year: "numeric",
                                                        })}

                                                    </p>

                                                </div>

                                            </div>

                                            <div className="mt-6 flex items-center justify-end">

                                                <span className="flex items-center gap-2 text-sm font-semibold text-blue-600 transition-all duration-200 group-hover:translate-x-1">

                                                    View Details →

                                                </span>

                                            </div>

                                        </div>

                                    </div>

                                </button>

                            );

                        })}

                    </div>

                </div>

            </div>
        </>

    )
}

export default MoviesPage