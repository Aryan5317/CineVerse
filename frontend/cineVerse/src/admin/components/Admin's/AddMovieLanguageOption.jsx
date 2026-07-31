import React from "react"
import { useState } from "react"

function AddMovieLanguageOption({ movieDetails, setMovieDetails }) {


    const AddNewMovieLanguage = (e) => {
        const { name, value, checked } = e.target
        console.log("Checked Value is: ", checked)
        console.log("name is new language component is: ", name)

        setMovieDetails((prev) => ({
            ...prev,
            [name]: (checked ? [...prev[name], value] : [...prev[name].filter((item) => item !== value)])
        }))
    }

    return (
        <>
            <div className="min-h-screen bg-slate-50 p-4">

                <div className="w-full rounded-2xl border border-slate-200 bg-white p-5 shadow-md">

                    <div className="mb-6">

                        <h1 className="text-2xl font-bold text-slate-900">
                            Select Language
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            Choose one or more languages for this movie.
                        </p>

                    </div>

                    <div className="grid grid-cols-2 gap-3">

                        {[
                            "Hindi",
                            "English",
                            "Tamil",
                            "Telugu",
                            "Malayalam",
                            "Kannada",
                            "Marathi",
                            "Bengali",
                            "Punjabi",
                            "Gujarati",
                            "Odia",
                            "Assamese",
                            "Bhojpuri",
                            "Konkani",
                            "Kashmiri",
                            "Maithili",
                            "Manipuri",
                            "Nepali",
                            "Sanskrit",
                            "Sindhi",
                            "Tulu",
                            "Dogri",
                            "Urdu",
                            "Arabic",
                            "Chinese (Mandarin)",
                            "Czech",
                            "Danish",
                            "Dutch",
                            "Finnish",
                            "French",
                            "German",
                            "Greek",
                            "Hebrew",
                            "Hungarian",
                            "Indonesian",
                            "Italian",
                            "Japanese",
                            "Korean",
                            "Malay",
                            "Norwegian",
                            "Persian (Farsi)",
                            "Polish",
                            "Portuguese",
                            "Romanian",
                            "Russian",
                            "Spanish",
                            "Swedish",
                            "Thai",
                            "Turkish",
                            "Ukrainian",
                            "Vietnamese",
                        ].map((language) => (

                            <label
                                key={language}
                                className="flex min-h-[56px] cursor-pointer items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-3 transition-all duration-200 hover:border-blue-300 hover:bg-blue-50 active:scale-[0.98]"
                            >

                                <input
                                    type="checkbox"
                                    checked={movieDetails?.movieLanguage?.includes(language) || false}
                                    value={language}
                                    name="movieLanguage"
                                    onChange={AddNewMovieLanguage}
                                    className="h-5 w-5 shrink-0 accent-blue-600"
                                />

                                <span className="text-sm font-medium leading-tight text-slate-700">
                                    {language}
                                </span>

                            </label>

                        ))}

                    </div>

                </div>

            </div>
        </>
    )
}

export default AddMovieLanguageOption