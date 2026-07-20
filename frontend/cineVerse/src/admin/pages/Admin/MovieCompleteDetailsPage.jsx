import React from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import movieDetails from "../../services/Admin/movieDetails.js"

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
        language: [],
        genre: [],
        cast: []
    })

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
                                    Director
                                </p>
                                <p className="mt-1 font-semibold text-gray-800">
                                    {completeMovieDetails.director}
                                </p>
                            </div>

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

                        <div className="grid md:grid-cols-2 gap-5">

                            <div className="rounded-xl border border-gray-200 bg-white p-4">
                                <p className="text-sm text-gray-500">
                                    Release Date
                                </p>

                                <p className="mt-1 font-semibold text-gray-800">
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
                                <p className="text-sm text-gray-500">
                                    Created Date
                                </p>

                                <p className="mt-1 font-semibold text-gray-800">
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
                                <p className="text-sm text-gray-500">
                                    Last Updated
                                </p>

                                <p className="mt-1 font-semibold text-gray-800">
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

                    <button className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold active:scale-95">
                        Edit
                    </button>

                    <button
                        onClick={MoveToMoviePage}
                        className="flex-1 bg-gray-700 text-white py-3 rounded-xl font-semibold active:scale-95">
                        Back
                    </button>

                    <button className="flex-1 bg-red-600 text-white py-3 rounded-xl font-semibold active:scale-95">
                        Delete
                    </button>

                </div>

            </div>
        </>
    )
}

export default MovieCompleteDetailsPage