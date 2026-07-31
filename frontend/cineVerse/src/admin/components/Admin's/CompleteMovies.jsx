import React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

function CompleteMovies({ title, movieData }) {

    const navigate = useNavigate()

    const ShowCompleteMovieDetails = (id) => {
        console.log("Movie Details clicked")
        navigate(`/admin/panel/movies/${id}`)

    }

    return (
        <>

                <div className="grid gap-6">

                    {movieData.map((movie, index) => {

                        console.log("Movie is:", movie);

                        return (

                            <button
                                key={index}
                                onClick={() => ShowCompleteMovieDetails(movie._id)}
                                className="group w-full overflow-hidden rounded-3xl border border-slate-200 bg-white text-left shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-blue-400 hover:shadow-xl active:scale-[0.99]"
                            >

                                <div className="flex flex-col">

                                    <div className="relative">

                                        <img
                                            src={movie.moviePosterUrl}
                                            alt={movie.title}
                                            className="h-72 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                        />

                                        <div className="absolute right-3 top-3 rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white shadow">

                                            {movie.availability}

                                        </div>

                                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4">

                                            <h2 className="text-2xl font-bold text-white">
                                                {movie.title}
                                            </h2>

                                            <div className="mt-2 flex items-center gap-2">

                                                <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold text-yellow-700 whitespace-nowrap">
                                                    ⭐ {movie.imdbRating}
                                                </span>

                                                <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-600">
                                                    {movie.ageRating}
                                                </span>

                                            </div>

                                        </div>

                                    </div>

                                    <div className="p-5">

                                        <p className="line-clamp-3 text-sm leading-6 text-slate-600">

                                            {movie.description}

                                        </p>

                                        <div className="mt-5 grid grid-cols-2 gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">

                                            <div>

                                                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                                                    Director
                                                </p>

                                                <p className="mt-1 text-sm font-semibold text-slate-800">
                                                    {movie.director}
                                                </p>

                                            </div>

                                            <div>

                                                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                                                    Duration
                                                </p>

                                                <p className="mt-1 text-sm font-semibold text-slate-800">
                                                    {movie.duration} min
                                                </p>

                                            </div>

                                            <div>

                                                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                                                    Release Date
                                                </p>

                                                <p className="mt-1 text-sm font-semibold text-slate-800">

                                                    {new Date(movie.releaseDate).toLocaleDateString(
                                                        "en-IN",
                                                        {
                                                            timeZone: "Asia/Kolkata",
                                                            day: "numeric",
                                                            month: "short",
                                                            year: "numeric",
                                                        }
                                                    )}

                                                </p>

                                            </div>

                                            <div>

                                                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                                                    Created
                                                </p>

                                                <p className="mt-1 text-sm font-semibold text-slate-800">

                                                    {new Date(movie.createdAt).toLocaleDateString(
                                                        "en-IN",
                                                        {
                                                            timeZone: "Asia/Kolkata",
                                                            day: "numeric",
                                                            month: "short",
                                                            year: "numeric",
                                                        }
                                                    )}

                                                </p>

                                            </div>

                                        </div>

                                        <div className="mt-5 flex flex-wrap gap-2">

                                            {movie.genre.map((genre) => (

                                                <span
                                                    key={genre}
                                                    className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
                                                >
                                                    {genre}
                                                </span>

                                            ))}

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
        </>
    )
}

export default CompleteMovies