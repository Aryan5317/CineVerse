import React from "react"
import { useState, useEffect } from "react"
import movieDetails from "../../services/Admin/movieDetails.js"
import { useParams, useNavigate } from "react-router-dom"
import AddMovieGenreOption from "../../components/Admin's/AddMovieGenreOption.jsx"
import AddMovieLanguageOption from "../../components/Admin's/AddMovieLanguageOption.jsx"
import editMovieValidation from "../../context/Admin/editMovieValidation.js"
import editMovieDetails from "../../services/Admin/editMovieDetails.js"
import { FaCheckCircle } from "react-icons/fa";

function EditMovieDetails() {

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
        movieLanguage: [],
        movieGenre: [],
        cast: [],
        writer: "",
        producer: "",
        productionHouse: "",
        musicDirector: "",
    })

    const [errors, setErrors] = useState({})
    const [updatedMovieMessage, setUpdatedMovieMessage] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const getMovieDetails = async () => {
            try {
                const movieDetailsResponse = await movieDetails(movieDetailsId)
                console.log("All movie Details is: ", movieDetailsResponse.data)
                if (movieDetailsResponse) {
                    setCompleteMovieDetails({
                        ...movieDetailsResponse.data,
                        movieGenre: movieDetailsResponse.data.genre || [],
                        movieLanguage: movieDetailsResponse.data.language || []
                    })
                }

            } catch (error) {
                console.log("Error from movie details is: ", error)
                setCompleteMovieDetails([])

            }
        }

        getMovieDetails()
    }, [])

    const [bannerPreview, setBannerPreview] = useState("")
    const [posterPreview, setPosterPreview] = useState("")

    useEffect(() => {
        setBannerPreview(completeMovieDetails.movieBannerUrl)
        setPosterPreview(completeMovieDetails.moviePosterUrl)
    }, [completeMovieDetails])

    const handleInputChange = (e) => {
        const { name, value } = e.target

        setCompleteMovieDetails((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleBannerChange = (e) => {
        const file = e.target.files[0]

        if (!file) return

        setCompleteMovieDetails((prev) => ({
            ...prev,
            movieBanner: file,
        }))

        setBannerPreview(URL.createObjectURL(file))
    }

    const handlePosterChange = (e) => {
        const file = e.target.files[0]

        if (!file) return

        setCompleteMovieDetails((prev) => ({
            ...prev,
            moviePoster: file,
        }))

        setPosterPreview(URL.createObjectURL(file))
    }

    const handleCastChange = (index, field, value) => {
        const updatedCast = [...completeMovieDetails.cast]

        updatedCast[index][field] = value

        setCompleteMovieDetails((prev) => ({
            ...prev,
            cast: updatedCast,
        }))
    }

    const addCast = () => {
        setCompleteMovieDetails((prev) => ({
            ...prev,
            cast: [
                {
                    actorName: "",
                    actorGender: "",
                },
                ...prev.cast,
            ],
        }))
    }

    const removeCast = (index) => {
        setCompleteMovieDetails((prev) => ({
            ...prev,
            cast: prev.cast.filter((_, i) => i !== index),
        }))
    }

    const cancelEdit = () => {
        navigate(-1)
    }

    const UpdateMovieDetails = () => {
        setLoading(true)

        console.log("Update movie values for validation are: ", completeMovieDetails)

        const editMovieValueErrorResponse = editMovieValidation(completeMovieDetails)
        if (Object.keys(editMovieValueErrorResponse).length !== 0) {
            setErrors(editMovieValueErrorResponse)
            setLoading(false)
            return
        }
        setErrors({})

        const updateMovie = async () => {
            try {
                const editMovieDetailsResponse = await editMovieDetails(completeMovieDetails, movieDetailsId)
                if (editMovieDetailsResponse) {
                    console.log("Edit movie details response: ", editMovieDetailsResponse)
                    setUpdatedMovieMessage(true)
                    setTimeout(() => {
                        navigate(-1)
                    }, 2000);
                }
            } catch (error) {
                console.log("Error from backend is: ", error)
                setUpdatedMovieMessage(false)
                setErrors((prev) => ({
                    ...prev,
                    message: error.message
                }))
            } finally {
                setLoading(false)
            }
        }
        updateMovie()
    }


    return (
        <>
            <div className="min-h-screen bg-gray-100 pb-24">

                <div className="bg-white shadow-sm sticky top-0 z-10 px-4 py-4 flex items-center justify-between">

                    <h1 className="text-xl font-bold text-gray-800">
                        Edit Movie
                    </h1>

                    <button
                        onClick={cancelEdit}
                        className="text-red-600 font-semibold"
                    >
                        Cancel
                    </button>

                </div>

                <div className="p-4 space-y-6">

                    <div className="bg-white rounded-2xl shadow overflow-hidden">

                        <div className="relative">

                            <img
                                src={bannerPreview}
                                alt="Movie Banner"
                                className="w-full h-52 object-cover"
                            />

                            <label className="absolute top-4 right-4 bg-black/70 text-white px-4 py-2 rounded-lg text-sm cursor-pointer">

                                Change Banner

                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleBannerChange}
                                />

                            </label>

                        </div>

                        <div className="flex justify-center pt-5">

                            <div className="relative">

                                <img
                                    src={posterPreview}
                                    alt="Movie Poster"
                                    className="w-32 h-44 rounded-2xl object-cover border-4 border-white shadow-xl"
                                />

                                <label className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1.5 rounded-lg text-xs cursor-pointer whitespace-nowrap">

                                    Change Poster

                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handlePosterChange}
                                    />

                                </label>

                            </div>

                        </div>

                        <div className="p-5 space-y-5">

                            <div>

                                <label className="block text-sm font-medium text-gray-600 mb-2">
                                    Movie Title
                                </label>

                                <input
                                    type="text"
                                    name="title"
                                    value={completeMovieDetails.title}
                                    onChange={handleInputChange}
                                    className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                                />

                            </div>

                            <div>

                                <label className="block text-sm font-medium text-gray-600 mb-2">
                                    Description
                                </label>

                                <textarea
                                    rows={6}
                                    name="description"
                                    value={completeMovieDetails.description}
                                    onChange={handleInputChange}
                                    className="w-full border rounded-xl px-4 py-3 outline-none resize-none focus:ring-2 focus:ring-blue-500"
                                />

                            </div>

                            <div className="grid grid-cols-2 gap-4">

                                <div>

                                    <label className="block text-sm font-medium text-gray-600 mb-2">
                                        Duration
                                    </label>

                                    <input
                                        type="number"
                                        name="duration"
                                        value={completeMovieDetails.duration}
                                        onChange={handleInputChange}
                                        className="w-full border rounded-xl px-4 py-3"
                                    />

                                </div>

                                <div>

                                    <label className="block text-sm font-medium text-gray-600 mb-2">
                                        IMDb Rating
                                    </label>

                                    <input
                                        type="number"
                                        step="0.1"
                                        name="imdbRating"
                                        value={completeMovieDetails.imdbRating}
                                        onChange={handleInputChange}
                                        className="w-full border rounded-xl px-4 py-3"
                                    />

                                </div>

                            </div>

                            <div>

                                <label className="block text-sm font-medium text-gray-600 mb-2">
                                    Release Date
                                </label>

                                <input
                                    type="date"
                                    name="releaseDate"
                                    value={
                                        completeMovieDetails.releaseDate
                                            ? new Date(completeMovieDetails.releaseDate)
                                                .toISOString()
                                                .split("T")[0]
                                            : ""
                                    }
                                    onChange={handleInputChange}
                                    className="w-full border rounded-xl px-4 py-3"
                                />

                            </div>

                            <div>

                                <label className="block text-sm font-medium text-gray-600 mb-2">
                                    Director
                                </label>

                                <input
                                    type="text"
                                    name="director"
                                    value={completeMovieDetails.director}
                                    onChange={handleInputChange}
                                    className="w-full border rounded-xl px-4 py-3"
                                />

                            </div>
                            <div>

                                <label className="block text-sm font-medium text-gray-600 mb-2">
                                    Writer
                                </label>

                                <input
                                    type="text"
                                    name="writer"
                                    value={completeMovieDetails.writer}
                                    onChange={handleInputChange}
                                    className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                                />

                            </div>

                            <div>

                                <label className="block text-sm font-medium text-gray-600 mb-2">
                                    Producer
                                </label>

                                <input
                                    type="text"
                                    name="producer"
                                    value={completeMovieDetails.producer}
                                    onChange={handleInputChange}
                                    className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                                />

                            </div>

                            <div>

                                <label className="block text-sm font-medium text-gray-600 mb-2">
                                    Production House
                                </label>

                                <input
                                    type="text"
                                    name="productionHouse"
                                    value={completeMovieDetails.productionHouse}
                                    onChange={handleInputChange}
                                    className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                                />

                            </div>

                            <div>

                                <label className="block text-sm font-medium text-gray-600 mb-2">
                                    Music Director
                                </label>

                                <input
                                    type="text"
                                    name="musicDirector"
                                    value={completeMovieDetails.musicDirector}
                                    onChange={handleInputChange}
                                    className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                                />

                            </div>

                            <div className="grid grid-cols-2 gap-4">

                                <div>

                                    <label className="block text-sm font-medium text-gray-600 mb-2">
                                        Availability
                                    </label>

                                    <select
                                        name="availabilityType"
                                        value={completeMovieDetails.availabilityType}
                                        onChange={handleInputChange}
                                        className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">Select</option>
                                        <option value="Streaming">Streaming</option>
                                        <option value="Theatre">Theatre</option>
                                        <option value="Both">Both</option>
                                    </select>

                                </div>

                                <div>

                                    <label className="block text-sm font-medium text-gray-600 mb-2">
                                        Age Rating
                                    </label>

                                    {console.log("Age Rating:", completeMovieDetails.ageRating)}
                                    <select
                                        name="ageRating"
                                        value={completeMovieDetails.ageRating}
                                        onChange={handleInputChange}
                                        className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">Select</option>
                                        <option value="U">U</option>
                                        <option value="U (Above 7)">U (Above 7)</option>
                                        <option value="U/A 13+">U/A 13+</option>
                                        <option value="U/A 16+">U/A 16+</option>
                                        <option value="A">A</option>
                                    </select>

                                </div>

                            </div>

                            <div>

                                <label className="block text-sm font-medium text-gray-600 mb-2">
                                    Trailer URL
                                </label>

                                <input
                                    type="text"
                                    name="movietrailerUrl"
                                    value={completeMovieDetails.movietrailerUrl}
                                    onChange={handleInputChange}
                                    className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                                />

                            </div>

                            <div>

                                <label className="block text-sm font-medium text-gray-600 mb-2">
                                    Streaming Video URL
                                </label>

                                <input
                                    type="text"
                                    name="streamingVideoUrl"
                                    value={completeMovieDetails.streamingVideoUrl}
                                    onChange={handleInputChange}
                                    className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                                />

                            </div>

                        </div >

                    </div >
                    <div className="space-y-6">

                        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">

                            <div className="border-b border-slate-200 px-5 py-4">

                                <h2 className="text-lg font-semibold text-slate-800">
                                    Movie Languages
                                </h2>

                                <p className="mt-1 text-sm text-slate-500">
                                    Select all languages available for this movie.
                                </p>

                            </div>

                            <AddMovieLanguageOption
                                movieDetails={completeMovieDetails}
                                setMovieDetails={setCompleteMovieDetails}
                            />

                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">

                            <div className="border-b border-slate-200 px-5 py-4">

                                <h2 className="text-lg font-semibold text-slate-800">
                                    Movie Genres
                                </h2>

                                <p className="mt-1 text-sm text-slate-500">
                                    Select all genres that best describe this movie.
                                </p>

                            </div>

                            <AddMovieGenreOption
                                movieDetails={completeMovieDetails}
                                setMovieDetails={setCompleteMovieDetails}
                            />

                        </div>

                    </div>

                    <div className="bg-white rounded-2xl shadow p-5">

                        <div className="flex items-center justify-between mb-5">

                            <h2 className="text-lg font-bold">
                                Cast
                            </h2>

                            <button
                                type="button"
                                onClick={addCast}
                                className="bg-blue-600 text-white px-4 py-2 rounded-xl"
                            >
                                Add New Cast
                            </button>

                        </div>

                        <div className="space-y-5">

                            {completeMovieDetails.cast.map((actor, index) => (

                                <div
                                    key={index}
                                    className="border rounded-2xl p-4 space-y-4"
                                >

                                    <input
                                        type="text"
                                        value={actor.actorName}
                                        placeholder="Actor Name"
                                        onChange={(e) =>
                                            handleCastChange(
                                                index,
                                                "actorName",
                                                e.target.value
                                            )
                                        }
                                        className="w-full border rounded-xl px-4 py-3"
                                    />

                                    <select
                                        value={actor.actorGender}
                                        onChange={(e) =>
                                            handleCastChange(
                                                index,
                                                "actorGender",
                                                e.target.value
                                            )
                                        }
                                        className="w-full border rounded-xl px-4 py-3"
                                    >

                                        <option value="">
                                            Select Gender
                                        </option>

                                        <option value="Male">
                                            Male
                                        </option>

                                        <option value="Female">
                                            Female
                                        </option>

                                        <option value="Other">
                                            Other
                                        </option>

                                    </select>

                                    <button
                                        type="button"
                                        onClick={() => removeCast(index)}
                                        className="w-full bg-red-500 text-white py-3 rounded-xl"
                                    >
                                        Remove Actor
                                    </button>

                                </div>

                            ))}

                        </div>

                    </div>

                    {errors.message && (
                        <p className="mt-3 rounded-lg bg-red-100 border border-red-300 px-4 py-2 text-sm font-medium text-red-700">
                            {errors.message}
                        </p>
                    )}

                    {updatedMovieMessage && (
                        <div className="mt-3 flex items-center gap-2 rounded-lg border border-green-300 bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
                            <FaCheckCircle className="text-green-600 text-lg" />
                            <span>Movie Details Updated Successfully</span>
                        </div>
                    )}
                </div >

                <div className="fixed bottom-0 left-0 w-full bg-white border-t px-4 py-4 flex gap-3">

                    <button
                        onClick={cancelEdit}
                        className="flex-1 py-3 rounded-xl border border-gray-300 font-semibold text-gray-700"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={UpdateMovieDetails}
                        disabled={loading}
                        className={`flex-1 py-3 rounded-xl font-semibold transition-all ${loading
                            ? "bg-blue-400 text-white cursor-not-allowed"
                            : "bg-blue-600 text-white hover:bg-blue-700"
                            }`}
                    >
                        {loading ? "Saving..." : "Save Changes"}
                    </button>

                </div>

            </div >
        </>
    )
}

export default EditMovieDetails