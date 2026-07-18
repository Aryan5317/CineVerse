import React from "react"
import { useState } from "react"

function AddMovieGenreOption({ setMovieDetails }) {


    const AddNewMovieGnere = (e) => {
        const { name, value, checked } = e.target
        console.log("Genre name is: ", name)
        console.log("Gemre value is: ", checked)

        setMovieDetails((prev) => ({
            ...prev,
            [name]: (checked ? [...prev[name], value] : [...prev[name].filter((item) => item !== value)])
        }))

    }
    return (
        <>
            <div className="w-full rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

                <h2 className="mb-4 text-lg font-semibold text-slate-800">
                    Select Genres
                </h2>

                <div className="grid grid-cols-2 gap-3">

                    {[
                        "Action",
                        "Adventure",
                        "Animation",
                        "Anime",
                        "Biography",
                        "Comedy",
                        "Crime",
                        "Documentary",
                        "Drama",
                        "Epic",
                        "Experimental",
                        "Family",
                        "Fantasy",
                        "History",
                        "Horror",
                        "Legal",
                        "Martial Arts",
                        "Medical",
                        "Music",
                        "Musical",
                        "Mystery",
                        "Mythology",
                        "Noir",
                        "Period Drama",
                        "Political",
                        "Psychological",
                        "Road Movie",
                        "Romance",
                        "Satire",
                        "Sci-Fi",
                        "Slice of Life",
                        "Social",
                        "Sport",
                        "Spy",
                        "Steampunk",
                        "Superhero",
                        "Supernatural",
                        "Survival",
                        "Teen",
                        "Thriller",
                        "Time Travel",
                        "War",
                        "Western",
                        "Zombie"
                    ].map((genre) => (
                        <label
                            key={genre}
                            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 active:scale-[0.98] transition-all cursor-pointer"
                        >
                            <input
                                type="checkbox"
                                value={genre}
                                name="movieGenre"
                                onChange={AddNewMovieGnere}
                                className="h-4 w-4 accent-blue-600"
                            />

                            <span className="text-sm font-medium text-slate-700">
                                {genre}
                            </span>
                        </label>
                    ))}

                </div>

            </div>
        </>
    )
}

export default AddMovieGenreOption