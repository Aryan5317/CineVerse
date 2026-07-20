import React from "react"
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import movieDetails from "../../services/User/getMovieDetails.js"
import UserSectionButton from "../../components/Users/UserSectionButton.jsx"

function MovieCompleteDetailsPage() {

    const { movieId } = useParams()
    const [movieData, setMovieData] = useState({
        ageRating: "",
        availabilityType: "",
        cast: [],
        cineVerseRating: "",
        createdAt: "",
        description: "",
        director: "",
        duration: "",
        dislikesCount: "",
        genre: [],
        language: [],
        likesCount: "",
        movieBannerUrl: "",
        moviePosterUrl: "",
        movietrailerUrl: "",
        releaseDate: "",
        streamingVideoUrl: "",
        title: "",
        totalRatings: "",
    })

    useEffect(() => {
        const getMovieDetails = async () => {
            try {
                const movieDetailsResponse = await movieDetails(movieId)
                if (movieDetailsResponse) {
                    console.log("Movie Details fetched is: ", movieDetailsResponse.data)
                    setMovieData(movieDetailsResponse.data)
                }
            } catch (error) {
                console.log("Error from backend is: ", error)
                setMovieData({})
            }
        }
        getMovieDetails()
    }, [])

    console.log("Movie id: ", movieId)

    return (
        <>
            <div className="min-h-screen bg-slate-50 pb-24">

                <div className="fixed top-0 left-0 right-0 z-50 flex h-16 items-center border-b border-slate-200 bg-white/90 px-4 backdrop-blur-md">

                    <button
                        className="flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 active:scale-95"
                    >
                        <span className="text-lg">←</span>

                        <span>Back</span>
                    </button>

                </div>

                <div className="relative">

                    <div className="relative h-72 bg-black overflow-hidden">

                        <img
                            src={movieData.movieBannerUrl}
                            alt={movieData.title}
                            className="w-full h-full object-cover"
                        />

                    </div>

                    <div className="relative -mt-16 flex flex-col items-center px-5">

                        <div className="w-40 h-56 rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-white">

                            <img
                                src={movieData.moviePosterUrl}
                                alt="Movie Poster"
                                className="w-full h-full object-cover"
                            />

                        </div>

                        <h1 className="mt-5 text-3xl font-extrabold text-slate-900 text-center">
                            {movieData.title}
                        </h1>

                        <div className="mt-3 flex flex-wrap justify-center gap-2">

                            <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-sm font-semibold">
                                ⭐ {movieData.imdbRating}
                            </span>

                            <span className="px-3 py-1 rounded-full bg-red-100 text-red-600 text-sm font-semibold">
                                {movieData.ageRating}
                            </span>

                            <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold">
                                {movieData.duration} min
                            </span>

                        </div>

                        <div className="mt-3 flex flex-wrap justify-center gap-2">

                            {movieData.genre.map((genre) => (

                                <span
                                    key={genre}
                                    className="px-3 py-1 rounded-full bg-slate-200 text-slate-700 text-sm font-medium"
                                >
                                    {genre}
                                </span>

                            ))}

                        </div>

                    </div>

                </div>

                <div className="px-5 mt-8">

                    <button
                        className="w-full h-14 rounded-2xl bg-red-600 text-white text-lg font-bold shadow-lg active:scale-95 transition-all duration-200"
                    >
                        ▶ WATCH MOVIE
                    </button>

                </div>

                <div className="w-full h-px bg-slate-200 my-8"></div>

                <div className="grid grid-cols-4 gap-3 px-5">

                    <button className="bg-white rounded-2xl border border-slate-200 shadow-sm py-4 flex flex-col items-center justify-center active:scale-95 transition-all">
                        <span className="text-2xl">♡</span>
                        <h1 className="text-xs font-semibold text-slate-700 mt-2">Wishlist</h1>
                    </button>

                    <button className="bg-white rounded-2xl border border-slate-200 shadow-sm py-4 flex flex-col items-center justify-center active:scale-95 transition-all">
                        <span className="text-2xl">⬇</span>
                        <h1 className="text-xs font-semibold text-slate-700 mt-2">Download</h1>
                    </button>

                    <button className="bg-white rounded-2xl border border-slate-200 shadow-sm py-4 flex flex-col items-center justify-center active:scale-95 transition-all">
                        <span className="text-2xl">🔗</span>
                        <h1 className="text-xs font-semibold text-slate-700 mt-2">Share</h1>
                    </button>

                    <button className="bg-white rounded-2xl border border-slate-200 shadow-sm py-4 flex flex-col items-center justify-center active:scale-95 transition-all">
                        <span className="text-2xl">⭐</span>
                        <h1 className="text-xs font-semibold text-slate-700 mt-2">Rate Now</h1>
                    </button>

                </div>

                <div className="w-full h-px bg-slate-200 my-8"></div>

                <div className="px-5">

                    <h1 className="text-xl font-bold text-slate-900 mb-4">
                        About Movie
                    </h1>

                    <p className="text-slate-600 text-[15px] leading-7">
                        {movieData.description}
                    </p>

                </div>

                <div className="w-full h-px bg-slate-200 my-8"></div>

                <div className="px-5">

                    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">

                        <div className="px-5 py-5 border-b border-slate-200">
                            <h1 className="text-xl font-bold text-slate-900">
                                Movie Information
                            </h1>
                        </div>

                        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">

                            <h1 className="font-medium text-slate-600">
                                IMDb Rating
                            </h1>

                            <div className="flex items-center gap-2">
                                <span className="text-yellow-500 text-lg">⭐</span>
                                <h1 className="font-bold text-slate-900">
                                    {movieData?.imdbRating}
                                </h1>
                            </div>

                        </div>

                        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">

                            <h1 className="font-medium text-slate-600">
                                Runtime
                            </h1>

                            <div className="flex items-center gap-1">
                                <h1 className="font-semibold text-slate-900">
                                    {movieData.duration}
                                </h1>
                                <span className="text-slate-500">
                                    min
                                </span>
                            </div>

                        </div>

                        <div className="flex items-start justify-between px-5 py-4 border-b border-slate-100">

                            <h1 className="font-medium text-slate-600 mt-1">
                                Language
                            </h1>

                            <div className="flex flex-wrap justify-end gap-2">

                                {movieData.language.map((lang) => (

                                    <div
                                        key={lang}
                                        className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium"
                                    >
                                        {lang}
                                    </div>

                                ))}

                            </div>

                        </div>

                        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">

                            <h1 className="font-medium text-slate-600">
                                Subtitle
                            </h1>

                            <div className="px-3 py-1 rounded-full bg-slate-100">
                                <h1 className="text-sm font-medium text-slate-700">
                                    English
                                </h1>
                            </div>

                        </div>

                        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">

                            <h1 className="font-medium text-slate-600">
                                Release Date
                            </h1>

                            <h1 className="font-semibold text-slate-900 text-right">
                                {new Date(movieData.releaseDate).toLocaleDateString("en-IN", {
                                    timeZone: "Asia/Kolkata",
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                })}
                            </h1>

                        </div>

                        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">

                            <h1 className="font-medium text-slate-600">
                                Certificate
                            </h1>

                            <div className="px-3 py-1 rounded-full bg-red-50">
                                <h1 className="text-sm font-semibold text-red-600">
                                    {movieData.ageRating}
                                </h1>
                            </div>

                        </div>

                        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">

                            <h1 className="font-medium text-slate-600">
                                Quality
                            </h1>

                            <div className="px-3 py-1 rounded-full bg-green-50">
                                <h1 className="text-sm font-semibold text-green-700">
                                    4K HDR
                                </h1>
                            </div>

                        </div>

                        <div className="flex items-start justify-between px-5 py-4 border-b border-slate-100">

                            <h1 className="font-medium text-slate-600 mt-1">
                                Genre
                            </h1>

                            <div className="flex flex-wrap justify-end gap-2">

                                {movieData.genre.map((gen) => (

                                    <div
                                        key={gen}
                                        className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-sm font-medium"
                                    >
                                        {gen}
                                    </div>

                                ))}

                            </div>

                        </div>

                        <div className="flex items-center justify-between px-5 py-4">

                            <h1 className="font-medium text-slate-600">
                                Country
                            </h1>

                            <h1 className="font-semibold text-slate-900">
                                INDIA
                            </h1>

                        </div>

                    </div>

                </div>

                <div className="w-full h-px bg-slate-200 my-8"></div>

                <div className="px-5">

                    <div className="flex items-center justify-between mb-5">

                        <h1 className="text-xl font-bold text-slate-900">
                            Cast
                        </h1>

                        <button className="text-sm font-semibold text-red-600">
                            View All
                        </button>

                    </div>

                    <div className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2">

                        {movieData.cast.map((actor, index) => (

                            <div
                                key={index}
                                className="snap-start min-w-[130px] bg-white rounded-2xl border border-slate-200 shadow-sm p-4 flex-shrink-0"
                            >

                                <div className="w-20 h-20 mx-auto rounded-full bg-slate-100 border border-slate-300 shadow-md flex items-center justify-center">

                                    <h1 className="text-3xl font-extrabold text-slate-700 uppercase">
                                        {actor.actorName[0]}
                                    </h1>

                                </div>

                                <div className="mt-4 text-center">

                                    <h1 className="text-xs text-slate-500 font-medium">

                                        {actor.actorGender === "Female" ? "Actress" : "Actor"}

                                    </h1>

                                    <h1 className="mt-1 text-sm font-bold text-slate-900 leading-5">

                                        {actor.actorName}

                                    </h1>

                                </div>

                            </div>

                        ))}

                    </div>

                </div>

                <div className="w-full h-px bg-slate-200 my-8"></div>

                <div className="px-5">

                    <h1 className="text-xl font-bold text-slate-900 mb-5">
                        Official Trailer
                    </h1>

                    <div className="relative w-full h-52 rounded-3xl overflow-hidden bg-slate-300 shadow-lg border border-slate-200">

                        <div className="absolute inset-0 bg-black/30"></div>

                        <div className="absolute inset-0 flex items-center justify-center">

                            <button className="w-20 h-20 rounded-full bg-white/90 backdrop-blur-md shadow-xl text-red-600 text-3xl flex items-center justify-center hover:scale-105 transition-all duration-200">

                                ▶

                            </button>

                        </div>

                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-5 py-4">

                            <h1 className="text-white text-lg font-bold">
                                Official Trailer
                            </h1>

                            <p className="text-slate-200 text-sm mt-1">
                                Watch the official trailer in HD
                            </p>

                        </div>

                    </div>

                </div>

                <footer className="fixed bottom-0 left-0 w-full h-20 bg-white border-t border-blue-500 shadow-lg rounded-lg">
                    <UserSectionButton />
                </footer>
            </div>
        </>
    )
}

export default MovieCompleteDetailsPage