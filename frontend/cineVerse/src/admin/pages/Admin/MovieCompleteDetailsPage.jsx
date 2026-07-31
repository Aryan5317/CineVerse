import React from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import movieDetails from "../../services/Admin/movieDetails.js"
import removeMovie from "../../services/Admin/inActivateMovie.js"
import activateMovie from "../../services/Admin/activateMovie.js"

function MovieCompleteDetailsPage() {

    const navigate = useNavigate()
    const { movieDetailsId } = useParams()
    const [completeMovieDetails, setCompleteMovieDetails] = useState({
        title: "",
        description: "",
        director: "",
        duration: "",
        createdAt: "",
        createdBy: "",
        availabilityType: "",
        ageRating: "",
        cineVerseRating: "",
        movieBannerUrl: null,
        moviePosterUrl: null,
        movietrailerUrl: "",
        releaseDate: "",
        streamingVideoUrl: "",
        totalRatings: "",
        updatedAt: "",
        _id: "",
        isDeleted: "",
        imdbRating: "",
        cineVerseRating: "",
        totalRatings: "",
        language: [],
        genre: [],
        cast: [],
        writer: "",
        producer: "",
        productionHouse: "",
        musicDirector: "",
    })  

    const [movieEditButton, setMovieEditButton] = useState(false)

    const MoveToMoviePage = () => {
        console.log("Back button is clicked")
        navigate("/admin/panel/movies")
    }

    useEffect(() => {
        const getMovieDetails = async () => {
            try {
                const movieDetailsResponse = await movieDetails(movieDetailsId)
                console.log("All movie Details is: ", movieDetailsResponse.data)
                if (movieDetailsResponse) {
                    setCompleteMovieDetails(movieDetailsResponse.data)
                }

            } catch (error) {
                console.log("Error from movie details is: ", error)
                setCompleteMovieDetails([])

            }
        }

        getMovieDetails()
    }, [])

    const EditMovie = () => {
        console.log("Movie edit button is clicked")
        navigate(`/admin/panel/movies/${movieDetailsId}/edit-movie`)
        setMovieEditButton(true)
    }

    const UpdateMovieStatus = (value) => {
        if (!value) {
            console.log("Value is: ", value)
            console.log("Delete movie button is clicked")
            const editMovieExist = async () => {
                try {
                    const deleteMovieResponse = await removeMovie(movieDetailsId)
                    if (deleteMovieResponse) {
                        navigate("/admin/panel/movies", {
                            state: {
                                message: "Movie removed successfully"
                            }
                        })
                    }
                } catch (error) {
                    console.log("Error from the backend is: ", error)
                }
            }
            editMovieExist()
        }
        else {
            console.log("Value are: ", value)
            console.log("Add button is clicked")
            const addMovie = async () => {
                try {
                    const activateMovieRespone = await activateMovie(movieDetailsId)
                    if (activateMovieRespone) {
                        navigate("/admin/panel/movies", {
                            state: {
                                message: "Movie added successfully"
                            }
                        })
                    }
                } catch (error) {
                    console.log("Error from backend is: ", error)
                }
            }
            addMovie()
        }

    }


    return (
        <>
            <div className="min-h-screen bg-gray-100 p-4 pb-24">

                <div className="flex items-center justify-between mb-6">

                    <h1 className="text-2xl font-bold text-gray-800">
                        Movie Details
                    </h1>

                    <div className="w-16"></div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

                    <img
                        src={completeMovieDetails?.movieBannerUrl}
                        alt="Banner"
                        className="w-full h-44 object-cover"
                    />

                    <div className="flex justify-center -mt-14 mb-5">
                        <img
                            src={completeMovieDetails?.moviePosterUrl}
                            alt="Poster"
                            className="w-28 h-40 object-cover rounded-xl border-4 border-white shadow-lg"
                        />
                    </div>

                    <div className="px-5 pb-6 space-y-5">

                        <div>
                            <p className="text-sm text-gray-500">Title</p>
                            <h2 className="text-2xl font-bold text-gray-900">
                                {completeMovieDetails.title}
                            </h2>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">Description</p>
                            <p className="mt-1 text-gray-700 leading-7">
                                {completeMovieDetails.description}
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-5">

                            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                                <p className="text-xs uppercase tracking-wide text-gray-500">
                                    Duration
                                </p>
                                <p className="mt-1 font-semibold text-gray-800">
                                    {completeMovieDetails.duration} min
                                </p>
                            </div>

                            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                                <p className="text-xs uppercase tracking-wide text-gray-500">
                                    Age Rating
                                </p>
                                <p className="mt-1 font-semibold text-gray-800">
                                    {completeMovieDetails.ageRating}
                                </p>
                            </div>

                            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                                <p className="text-xs uppercase tracking-wide text-gray-500">
                                    Availability
                                </p>
                                <p className="mt-1 font-semibold text-gray-800">
                                    {completeMovieDetails.availabilityType}
                                </p>
                            </div>

                        </div>

                        <div className="grid gap-5 md:grid-cols-2">

                            <div className="rounded-xl border border-gray-200 bg-white p-4">
                                <p className="text-sm font-medium text-gray-500">
                                    Release Date
                                </p>

                                <p className="mt-2 text-base font-semibold text-gray-800">
                                    {new Date(
                                        completeMovieDetails.releaseDate
                                    ).toLocaleDateString("en-IN", {
                                        timeZone: "Asia/Kolkata",
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric",
                                    })}
                                </p>
                            </div>

                            <div className="rounded-xl border border-gray-200 bg-white p-4">
                                <p className="text-sm font-medium text-gray-500">
                                    Created Date
                                </p>

                                <p className="mt-2 text-base font-semibold text-gray-800">
                                    {new Date(
                                        completeMovieDetails.createdAt
                                    ).toLocaleDateString("en-IN", {
                                        timeZone: "Asia/Kolkata",
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric",
                                    })}
                                </p>
                            </div>

                            <div className="rounded-xl border border-gray-200 bg-white p-4 md:col-span-2">
                                <p className="text-sm font-medium text-gray-500">
                                    Last Updated
                                </p>

                                <p className="mt-2 text-base font-semibold text-gray-800">
                                    {new Date(
                                        completeMovieDetails.updatedAt
                                    ).toLocaleDateString("en-IN", {
                                        timeZone: "Asia/Kolkata",
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric",
                                    })}
                                </p>
                            </div>

                            <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-4">
                                <p className="text-sm font-medium text-gray-500">
                                    IMDb Rating
                                </p>

                                <p className="mt-2 text-lg font-bold text-yellow-700">
                                    ⭐ {completeMovieDetails.imdbRating}
                                </p>
                            </div>

                            <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
                                <p className="text-sm font-medium text-gray-500">
                                    CineVerse Rating
                                </p>

                                <p className="mt-2 text-lg font-bold text-blue-700">
                                    ⭐ {completeMovieDetails.cineVerseRating}
                                </p>
                            </div>

                            <div className="rounded-xl border border-green-200 bg-green-50 p-4 md:col-span-2">
                                <p className="text-sm font-medium text-gray-500">
                                    Total Ratings
                                </p>

                                <p className="mt-2 text-lg font-bold text-green-700">
                                    {completeMovieDetails.totalRatings}
                                </p>
                            </div>

                        </div>

                        <div className="grid gap-5 md:grid-cols-2">

                            <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                                    Director
                                </p>
                                <p className="mt-2 text-base font-semibold text-gray-800">
                                    {completeMovieDetails.director}
                                </p>
                            </div>

                            <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                                    Writer
                                </p>
                                <p className="mt-2 text-base font-semibold text-gray-800">
                                    {completeMovieDetails.writer}
                                </p>
                            </div>

                            <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                                    Production House
                                </p>
                                <p className="mt-2 text-base font-semibold text-gray-800">
                                    {completeMovieDetails.productionHouse}
                                </p>
                            </div>

                            <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                                    Music Director
                                </p>
                                <p className="mt-2 text-base font-semibold text-gray-800">
                                    {completeMovieDetails.musicDirector}
                                </p>
                            </div>

                            <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm md:col-span-2">
                                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                                    Producer
                                </p>
                                <p className="mt-2 text-base font-semibold text-gray-800">
                                    {completeMovieDetails.producer}
                                </p>
                            </div>

                        </div>

                        <div>
                            <p className="mb-3 text-sm font-medium text-gray-500">
                                Languages
                            </p>

                            <div className="flex flex-wrap gap-3">
                                {completeMovieDetails.language.map((lang) => (
                                    <span
                                        key={lang}
                                        className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700"
                                    >
                                        {lang}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div>
                            <p className="mb-3 text-sm font-medium text-gray-500">
                                Genres
                            </p>

                            <div className="flex flex-wrap gap-3">
                                {completeMovieDetails.genre.map((gen) => (
                                    <span
                                        key={gen}
                                        className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700"
                                    >
                                        {gen}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div>

                            <h2 className="mb-4 text-xl font-bold text-gray-900">
                                Cast
                            </h2>

                            <div className="grid gap-4 sm:grid-cols-2">

                                {completeMovieDetails.cast.map((actor, index) => (

                                    <div
                                        key={index}
                                        className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md"
                                    >

                                        <div className="flex items-center gap-4">

                                            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-xl font-bold text-blue-700">
                                                {actor.actorName.charAt(0)}
                                            </div>

                                            <div>

                                                <h3 className="text-lg font-semibold text-gray-900">
                                                    {actor.actorName}
                                                </h3>

                                                <p className="text-sm text-gray-500">
                                                    {actor.actorGender}
                                                </p>

                                            </div>

                                        </div>

                                    </div>

                                ))}

                            </div>

                        </div>

                    </div>
                </div>

                <div className="fixed bottom-0 left-0 w-full bg-white border-t p-4 flex gap-3">

                    <button
                        onClick={EditMovie}
                        className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold active:scale-95">
                        Edit
                    </button>

                    <button
                        onClick={MoveToMoviePage}
                        className="flex-1 bg-gray-700 text-white py-3 rounded-xl font-semibold active:scale-95">
                        Back
                    </button>

                    <button
                        onClick={() => UpdateMovieStatus(completeMovieDetails.isDeleted)}
                        className="flex-1 bg-red-600 text-white py-3 rounded-xl font-semibold active:scale-95">
                        {completeMovieDetails.isDeleted ? "Add" : "Delete"}
                    </button>

                </div>

            </div>
        </>
    )
}

export default MovieCompleteDetailsPage