import React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import AddMovieGenreOption from "../../components/Admin's/AddMovieGenreOption"
import AddMovieLanguageOption from "../../components/Admin's/AddMovieLanguageOption"
import AddNewMovieActors from "../../components/Admin's/AddNewMovieActors"
import addNewMovieValidation from "../../context/Admin/addNewMovieValidation.js"
import publishNewMovie from "../../services/Admin/publishNewMovie.js"

function AddNewMovies() {

    const navigate = useNavigate()

    const [movieDetails, setMovieDetails] = useState({
        moviePosterUrl: null,
        bannerUrl: null,
        movieTitle: "",
        movieDescription: "",
        movieReleaseDate: "",
        movieDuration: "",
        movieAgeRating: "",
        movieGenre: [],
        movieLanguage: [],
        movieDirector: "",
        productionHouse: "",
        producer: "",
        writer: "",
        musicDirector: "",
        movieActors: [],
        movieIMDbRating: "",
        movieAvailability: "",
        movieTrailerUrl: "",
        movieStreamingUrl: "",
    })
    const [addGenre, setAddGenre] = useState(false)
    const [addLangage, setAddLanguage] = useState(false)
    const [addActor, setAddActor] = useState(false)
    const [addCastMessage, setAddCastMessage] = useState(false)
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)
    const [addMovieMessage, setAddMovieMessage] = useState(false)

    const MoveToLastPage = () => {
        console.log("Back button is clicked")
        navigate("/admin/panel/dashboard")
    }

    const HandleMoviePosterUrl = (e) => {
        const { name, files } = e.target;
        console.log(files[0]);
        setMovieDetails((prev) => ({
            ...prev,
            [name]: files[0]
        }))
    }

    const HandleBannerUrl = (e) => {
        const { name, files } = e.target
        console.log(files[0])
        setMovieDetails((prev) => ({
            ...prev,
            [name]: files[0]
        }))
    }

    const SetMovieTitleValue = (e) => {
        const { name, value } = e.target
        setMovieDetails((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const SetMovieDescription = (e) => {
        const { name, value } = e.target
        setMovieDetails((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const SetMovieReleaseDate = (e) => {
        const { name, value } = e.target
        setMovieDetails((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const SetMovieDuration = (e) => {
        const { name, value } = e.target
        setMovieDetails((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const SetMovieAgeRating = (e) => {
        const { name, value } = e.target
        console.log("Radio button value: ", value)
        console.log("Radio button name: ", name)
        setMovieDetails((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const AddNewGenre = () => {
        setAddGenre((prev) => !prev)
    }

    const AddNewLanguage = () => {
        setAddLanguage((prev) => !prev)
    }

    const SetMovieDirector = (e) => {
        const { name, value } = e.target
        setMovieDetails((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const SetProductionHouse = (e) => {
        const { name, value } = e.target
        setMovieDetails((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const SetProducer = (e) => {
        const { name, value } = e.target
        setMovieDetails((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const SetWritter = (e) => {
        const { name, value } = e.target
        setMovieDetails((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const SetMusicDirector = (e) => {
        const { name, value } = e.target
        setMovieDetails((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const SetMovieIMDbRating = (e) => {
        const { name, value } = e.target
        setMovieDetails((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const SetMovieAvailabelOption = (e) => {
        const { name, value } = e.target
        console.log("Availability type name: ", name)
        console.log("Avalability type value: ", value)
        setMovieDetails((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const SetMovieTrailerUrl = (e) => {
        const { name, value } = e.target
        console.log("Trailer value is: ", value)
        setMovieDetails((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const SetMovieUrl = (e) => {
        const { name, value } = e.target
        console.log("Movie Url is: ", value)
        setMovieDetails((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const AddNewActors = () => {
        setAddActor((prev) => !prev)
    }


    useEffect(() => {
        setTimeout(() => {
            setAddCastMessage(false)
        }, 2000);
    }, [addCastMessage])

    const AddMovie = () => {
        const addNewMovie = async () => {
            setLoading(true)
            const newMovieValidationResponse = addNewMovieValidation(movieDetails)
            console.log("New mvoie validation response: ", newMovieValidationResponse)
            if (Object.keys(newMovieValidationResponse).length !== 0) {
                setErrors(newMovieValidationResponse)
                setLoading(false)
                return
            }
            setErrors({})

            try {
                const publishMovieValue = await publishNewMovie(movieDetails)
                console.log("Publish movie value is: ", publishMovieValue)
                if (publishMovieValue) {
                    setLoading(true)
                    setTimeout(() => {
                        setAddMovieMessage(true)
                        navigate("/admin/panel/movies")
                    }, 2000);
                }
            } catch (error) {
                console.log("Error from backend while adding the movie", error)
                setErrors((prev) => ({
                    ...prev,
                    message: error.message
                }))
                setLoading(false)
                setAddMovieMessage(false)
            } finally {
                setLoading(false)
            }

        }
        addNewMovie()
    }

    return (
        <>
            <div className="min-h-screen bg-slate-50 p-4">

                <div className="mb-5">

                    <button
                        onClick={MoveToLastPage}
                        className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-700 shadow-sm transition-all duration-200 hover:border-slate-400 hover:bg-slate-100 active:scale-95">

                        <span className="text-lg font-semibold">
                            ←
                        </span>

                        <h1 className="font-semibold">
                            Back
                        </h1>

                    </button>

                </div>

                <div className="space-y-5">

                    <div>

                        <h1 className="text-2xl font-bold text-slate-900">
                            Add New Movie / Series
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            Fill in the details below to publish a new movie or streaming content.
                        </p>

                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-md">

                        <div className="mb-5 border-b border-slate-200 pb-4">

                            <h1 className="text-xl font-bold text-slate-900">
                                🎬 Media
                            </h1>

                            <p className="mt-1 text-sm text-slate-500">
                                Upload the poster and banner for the movie.
                            </p>

                        </div>

                        <div className="space-y-6">

                            <div>

                                <h1 className="mb-2 font-semibold text-slate-700">
                                    Movie Poster
                                </h1>

                                <input
                                    type="file"
                                    name="moviePosterUrl"
                                    onChange={HandleMoviePosterUrl}
                                    className="block w-full cursor-pointer rounded-xl border border-slate-300 bg-slate-50 px-3 py-3 text-sm text-slate-600 transition-all duration-200 file:mr-4 file:cursor-pointer file:rounded-lg file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:font-medium file:text-white hover:border-blue-300 hover:bg-blue-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                />

                                {errors.moviePosterUrl && (

                                    <p className="mt-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-600">

                                        {errors.moviePosterUrl}

                                    </p>

                                )}

                            </div>

                            <div>

                                <h1 className="mb-2 font-semibold text-slate-700">
                                    Movie Banner
                                </h1>

                                <input
                                    type="file"
                                    name="bannerUrl"
                                    onChange={HandleBannerUrl}
                                    className="block w-full cursor-pointer rounded-xl border border-slate-300 bg-slate-50 px-3 py-3 text-sm text-slate-600 transition-all duration-200 file:mr-4 file:cursor-pointer file:rounded-lg file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:font-medium file:text-white hover:border-blue-300 hover:bg-blue-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                />

                                {errors.bannerUrl && (

                                    <p className="mt-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-600">

                                        {errors.bannerUrl}

                                    </p>

                                )}

                            </div>

                        </div>

                    </div>

                    <div className="space-y-5">

                        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-md">

                            <div className="mb-6 border-b border-slate-200 pb-4">

                                <div className="flex items-center gap-3">

                                    <h1 className="text-2xl">
                                        🎬
                                    </h1>

                                    <div>

                                        <h1 className="text-xl font-bold text-slate-900">
                                            Basic Information
                                        </h1>

                                        <p className="mt-1 text-sm text-slate-500">
                                            Enter the basic details about the movie or series.
                                        </p>

                                    </div>

                                </div>

                            </div>

                            <div className="space-y-6">

                                <div>

                                    <label className="mb-2 block font-semibold text-slate-700">
                                        Movie Title
                                    </label>

                                    <input
                                        type="text"
                                        name="movieTitle"
                                        placeholder="Enter movie title"
                                        value={movieDetails.movieTitle}
                                        onChange={SetMovieTitleValue}
                                        className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200"
                                    />

                                    {errors.movieTitle && (

                                        <p className="mt-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-600">

                                            {errors.movieTitle}

                                        </p>

                                    )}

                                </div>

                                <div>

                                    <label className="mb-2 block font-semibold text-slate-700">
                                        Description
                                    </label>

                                    <textarea
                                        name="movieDescription"
                                        rows={5}
                                        placeholder="Write a short description about the movie..."
                                        value={movieDetails.movieDescription}
                                        onChange={SetMovieDescription}
                                        className="w-full resize-none rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200"
                                    />

                                    {errors.movieDescription && (

                                        <p className="mt-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-600">

                                            {errors.movieDescription}

                                        </p>

                                    )}

                                </div>

                            </div>

                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-md">

                            <div className="mb-6 border-b border-slate-200 pb-4">

                                <div className="flex items-center gap-3">

                                    <h1 className="text-2xl">
                                        📅
                                    </h1>

                                    <div>

                                        <h1 className="text-xl font-bold text-slate-900">
                                            Release Details
                                        </h1>

                                        <p className="mt-1 text-sm text-slate-500">
                                            Enter the release information and certification.
                                        </p>

                                    </div>

                                </div>

                            </div>

                            <div className="space-y-6">

                                <div>

                                    <label className="mb-2 block font-semibold text-slate-700">
                                        Release Date
                                    </label>

                                    <input
                                        type="date"
                                        name="movieReleaseDate"
                                        value={movieDetails.movieReleaseDate}
                                        onChange={SetMovieReleaseDate}
                                        className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition-all duration-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200"
                                    />

                                    {errors.movieReleaseDate && (

                                        <p className="mt-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-600">

                                            {errors.movieReleaseDate}

                                        </p>

                                    )}

                                </div>

                                <div>

                                    <label className="mb-2 block font-semibold text-slate-700">
                                        Duration
                                    </label>

                                    <input
                                        type="text"
                                        name="movieDuration"
                                        placeholder="Example: 2h 35m"
                                        value={movieDetails.movieDuration}
                                        onChange={SetMovieDuration}
                                        className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200"
                                    />

                                    {errors.movieDuration && (

                                        <p className="mt-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-600">

                                            {errors.movieDuration}

                                        </p>

                                    )}

                                </div>

                                <div>

                                    <label className="mb-3 block font-semibold text-slate-700">
                                        Age Rating
                                    </label>

                                    <div className="space-y-3">

                                        <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 transition-all duration-200 hover:border-blue-300 hover:bg-blue-50">

                                            <input
                                                type="radio"
                                                name="movieAgeRating"
                                                value="U (Below 7)"
                                                onChange={SetMovieAgeRating}
                                                className="h-5 w-5 accent-blue-600"
                                            />

                                            <span className="font-medium text-slate-700">
                                                U (Below 7)
                                            </span>

                                        </label>

                                        <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 transition-all duration-200 hover:border-blue-300 hover:bg-blue-50">

                                            <input
                                                type="radio"
                                                name="movieAgeRating"
                                                value="U (13+)"
                                                onChange={SetMovieAgeRating}
                                                className="h-5 w-5 accent-blue-600"
                                            />

                                            <span className="font-medium text-slate-700">
                                                U (13+)
                                            </span>

                                        </label>

                                        <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 transition-all duration-200 hover:border-blue-300 hover:bg-blue-50">

                                            <input
                                                type="radio"
                                                name="movieAgeRating"
                                                value="U/A (16+)"
                                                onChange={SetMovieAgeRating}
                                                className="h-5 w-5 accent-blue-600"
                                            />

                                            <span className="font-medium text-slate-700">
                                                U/A (16+)
                                            </span>

                                        </label>

                                        <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 transition-all duration-200 hover:border-blue-300 hover:bg-blue-50">

                                            <input
                                                type="radio"
                                                name="movieAgeRating"
                                                value="A (18+)"
                                                onChange={SetMovieAgeRating}
                                                className="h-5 w-5 accent-blue-600"
                                            />

                                            <span className="font-medium text-slate-700">
                                                A (18+)
                                            </span>

                                        </label>

                                    </div>

                                    {errors.movieAgeRating && (

                                        <p className="mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-600">

                                            {errors.movieAgeRating}

                                        </p>

                                    )}

                                </div>

                            </div>

                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-md">

                            <div className="mb-6 border-b border-slate-200 pb-4">

                                <div className="flex items-center gap-3">

                                    <h1 className="text-2xl">
                                        🎭
                                    </h1>

                                    <div>

                                        <h1 className="text-xl font-bold text-slate-900">
                                            Categories
                                        </h1>

                                        <p className="mt-1 text-sm text-slate-500">
                                            Select the genres and languages available for this movie.
                                        </p>

                                    </div>

                                </div>

                            </div>

                            <div className="space-y-6">


                                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">

                                    <div className="flex items-center justify-between">

                                        <div>

                                            <h2 className="text-base font-semibold text-slate-800">
                                                Genre
                                            </h2>

                                            <p className="mt-1 text-sm text-slate-500">
                                                Choose one or more genres for the movie.
                                            </p>

                                        </div>

                                        <button
                                            onClick={AddNewGenre}
                                            className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-blue-700 active:scale-95"
                                        >
                                            {addGenre ? "Done" : "+ Add Genre"}
                                        </button>

                                    </div>

                                    {errors.movieGenre && (

                                        <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-600">

                                            {errors.movieGenre}

                                        </p>

                                    )}

                                    {addGenre && (

                                        <div className="mt-5 border-t border-slate-200 pt-5">

                                            <AddMovieGenreOption
                                                setMovieDetails={setMovieDetails}
                                            />

                                        </div>

                                    )}

                                </div>


                                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">

                                    <div className="flex items-center justify-between">

                                        <div>

                                            <h2 className="text-base font-semibold text-slate-800">
                                                Language
                                            </h2>

                                            <p className="mt-1 text-sm text-slate-500">
                                                Select the languages supported by the movie.
                                            </p>

                                        </div>

                                        <button
                                            onClick={AddNewLanguage}
                                            className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-blue-700 active:scale-95"
                                        >
                                            {addLangage ? "Done" : "+ Add Language"}
                                        </button>

                                    </div>

                                    {errors.movieLanguage && (

                                        <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-600">

                                            {errors.movieLanguage}

                                        </p>

                                    )}

                                    {addLangage && (

                                        <div className="mt-5 border-t border-slate-200 pt-5">

                                            <AddMovieLanguageOption
                                                setMovieDetails={setMovieDetails}
                                            />

                                        </div>

                                    )}

                                </div>

                            </div>

                        </div>

                    </div>

                    <div className="space-y-5">

                        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-md">

                            <div className="mb-6 border-b border-slate-200 pb-4">

                                <div className="flex items-center gap-3">

                                    <h1 className="text-2xl">
                                        🎬
                                    </h1>

                                    <div>

                                        <h1 className="text-xl font-bold text-slate-900">
                                            Cast & Crew
                                        </h1>

                                        <p className="mt-1 text-sm text-slate-500">
                                            Add the director and cast members for this movie.
                                        </p>

                                    </div>

                                </div>

                            </div>

                            <div className="space-y-6">

                                <div>

                                    <label className="mb-2 block font-semibold text-slate-700">
                                        Director
                                    </label>

                                    <input
                                        type="text"
                                        name="movieDirector"
                                        value={movieDetails.movieDirector}
                                        onChange={SetMovieDirector}
                                        placeholder="Enter director name"
                                        className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200"
                                    />

                                    {errors.movieDirector && (

                                        <p className="mt-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-600">

                                            {errors.movieDirector}

                                        </p>

                                    )}

                                </div>

                                <div>

                                    <label className="mb-2 block font-semibold text-slate-700">
                                        Production House
                                    </label>

                                    <input
                                        type="text"
                                        name="productionHouse"
                                        value={movieDetails.productionHouse}
                                        onChange={SetProductionHouse}
                                        placeholder="Enter production house"
                                        className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200"
                                    />

                                    {errors.productionHouse && (

                                        <p className="mt-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-600">

                                            {errors.productionHouse}

                                        </p>

                                    )}

                                </div>

                                <div>

                                    <label className="mb-2 block font-semibold text-slate-700">
                                        Producer
                                    </label>

                                    <input
                                        type="text"
                                        name="producer"
                                        value={movieDetails.producer}
                                        onChange={SetProducer}
                                        placeholder="Enter producer name"
                                        className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200"
                                    />

                                    {errors.producer && (

                                        <p className="mt-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-600">

                                            {errors.producer}

                                        </p>

                                    )}

                                </div>

                                <div>

                                    <label className="mb-2 block font-semibold text-slate-700">
                                        Writer
                                    </label>

                                    <input
                                        type="text"
                                        name="writer"
                                        value={movieDetails.writer}
                                        onChange={SetWritter}
                                        placeholder="Enter writer name"
                                        className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200"
                                    />

                                    {errors.writer && (

                                        <p className="mt-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-600">

                                            {errors.writer}

                                        </p>

                                    )}

                                </div>

                                <div>

                                    <label className="mb-2 block font-semibold text-slate-700">
                                        Music Director
                                    </label>

                                    <input
                                        type="text"
                                        name="musicDirector"
                                        value={movieDetails.musicDirector}
                                        onChange={SetMusicDirector}
                                        placeholder="Enter music director name"
                                        className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200"
                                    />

                                    {errors.musicDirector && (

                                        <p className="mt-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-600">

                                            {errors.musicDirector}

                                        </p>

                                    )}

                                </div>

                            </div>

                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-md">

                            <div className="mb-6 border-b border-slate-200 pb-4">

                                <div className="flex items-center gap-3">

                                    <h1 className="text-2xl">
                                        ⭐
                                    </h1>

                                    <div>

                                        <h1 className="text-xl font-bold text-slate-900">
                                            Ratings
                                        </h1>

                                        <p className="mt-1 text-sm text-slate-500">
                                            Provide the movie rating information.
                                        </p>

                                    </div>

                                </div>

                            </div>

                            <div>

                                <label className="mb-2 block font-semibold text-slate-700">
                                    IMDb Rating
                                </label>

                                <input
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    max="10"
                                    name="movieIMDbRating"
                                    value={movieDetails.movieIMDbRating}
                                    onChange={SetMovieIMDbRating}
                                    placeholder="Enter IMDb rating (0 - 10)"
                                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200"
                                />

                                {errors.movieIMDbRating && (

                                    <p className="mt-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-600">

                                        {errors.movieIMDbRating}

                                    </p>

                                )}

                            </div>

                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-md">

                            <div className="mb-6 border-b border-slate-200 pb-4">

                                <div className="flex items-center gap-3">

                                    <h1 className="text-2xl">
                                        🎥
                                    </h1>

                                    <div>

                                        <h1 className="text-xl font-bold text-slate-900">
                                            Availability
                                        </h1>

                                        <p className="mt-1 text-sm text-slate-500">
                                            Select where this movie will be available.
                                        </p>

                                    </div>

                                </div>

                            </div>

                            <div>

                                <label className="mb-3 block font-semibold text-slate-700">
                                    Movie Availability
                                </label>

                                <div className="space-y-3">

                                    <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 transition-all duration-200 hover:border-blue-300 hover:bg-blue-50">

                                        <input
                                            type="radio"
                                            name="movieAvailability"
                                            value="Theatre"
                                            onChange={SetMovieAvailabelOption}
                                            className="h-5 w-5 accent-blue-600"
                                        />

                                        <span className="font-medium text-slate-700">
                                            Theatre
                                        </span>

                                    </label>

                                    <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 transition-all duration-200 hover:border-blue-300 hover:bg-blue-50">

                                        <input
                                            type="radio"
                                            name="movieAvailability"
                                            value="Streaming"
                                            onChange={SetMovieAvailabelOption}
                                            className="h-5 w-5 accent-blue-600"
                                        />

                                        <span className="font-medium text-slate-700">
                                            Streaming
                                        </span>

                                    </label>

                                    <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 transition-all duration-200 hover:border-blue-300 hover:bg-blue-50">

                                        <input
                                            type="radio"
                                            name="movieAvailability"
                                            value="Both"
                                            onChange={SetMovieAvailabelOption}
                                            className="h-5 w-5 accent-blue-600"
                                        />

                                        <span className="font-medium text-slate-700">
                                            Both
                                        </span>

                                    </label>

                                </div>

                                {errors.movieAvailability && (

                                    <p className="mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-600">

                                        {errors.movieAvailability}

                                    </p>

                                )}

                            </div>

                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-md">

                            <div className="mb-6 border-b border-slate-200 pb-4">

                                <div className="flex items-center gap-3">

                                    <h1 className="text-2xl">
                                        🎞
                                    </h1>

                                    <div>

                                        <h1 className="text-xl font-bold text-slate-900">
                                            Trailer
                                        </h1>

                                        <p className="mt-1 text-sm text-slate-500">
                                            Upload the official trailer for the movie.
                                        </p>

                                    </div>

                                </div>

                            </div>

                            <div>

                                <label className="mb-2 block font-semibold text-slate-700">
                                    Trailer Video
                                </label>

                                <input
                                    type="url"
                                    name="movieTrailerUrl"
                                    value={movieDetails.movieTrailerUrl}
                                    onChange={SetMovieTrailerUrl}
                                    className="block w-full cursor-pointer rounded-xl border border-slate-300 bg-slate-50 px-3 py-3 text-sm text-slate-600 transition-all duration-200 file:mr-4 file:cursor-pointer file:rounded-lg file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:font-medium file:text-white hover:border-blue-300 hover:bg-blue-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                />

                                {errors.movieTrailerUrl && (

                                    <p className="mt-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-600">

                                        {errors.movieTrailerUrl}

                                    </p>

                                )}

                            </div>

                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-md">

                            <div className="mb-6 border-b border-slate-200 pb-4">

                                <div className="flex items-center gap-3">

                                    <h1 className="text-2xl">
                                        🎬
                                    </h1>

                                    <div>

                                        <h1 className="text-xl font-bold text-slate-900">
                                            Streaming
                                        </h1>

                                        <p className="mt-1 text-sm text-slate-500">
                                            Upload the streaming version of the movie.
                                        </p>

                                    </div>

                                </div>

                            </div>

                            <div>

                                <label className="mb-2 block font-semibold text-slate-700">
                                    Streaming Video
                                </label>

                                <input
                                    type="url"
                                    name="movieStreamingUrl"
                                    value={movieDetails.movieStreamingUrl}
                                    onChange={SetMovieUrl}
                                    className="block w-full cursor-pointer rounded-xl border border-slate-300 bg-slate-50 px-3 py-3 text-sm text-slate-600 transition-all duration-200 file:mr-4 file:cursor-pointer file:rounded-lg file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:font-medium file:text-white hover:border-blue-300 hover:bg-blue-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                />

                                {errors.movieStreamingUrl && (

                                    <p className="mt-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-600">

                                        {errors.movieStreamingUrl}

                                    </p>

                                )}

                            </div>

                        </div>

                        <div className="space-y-4">

                            <div className="grid grid-cols-2 gap-4">

                                <button
                                    className="rounded-xl border border-slate-300 bg-white py-3 font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:bg-slate-100 active:scale-95"
                                >
                                    Save Draft
                                </button>

                                <button
                                    onClick={AddMovie}
                                    className="rounded-xl bg-blue-600 py-3 font-semibold text-white shadow-sm transition-all duration-200 hover:bg-blue-700 active:scale-95"
                                >
                                    Publish Movie
                                </button>

                            </div>

                            {addMovieMessage && (

                                <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3">

                                    <p className="text-center text-sm font-semibold text-green-700">
                                        🎉 Movie published successfully.
                                    </p>

                                </div>

                            )}

                        </div>

                    </div>

                </div>
            </div >
        </>
    )
}

export default AddNewMovies