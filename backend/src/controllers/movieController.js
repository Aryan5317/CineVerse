import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { Movie } from "../models/movieModal.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import ApiError from "../utils/errorHandling.js";
import { json } from "stream/consumers";
import mongoose from "mongoose";

const createMovie = asyncHandler(async (req, res, next) => {

    const adminData = req.admin
    if (adminData.role !== "admin") {
        throw new ApiError(403, "Forbidden Admin")
    }

    console.log("Admin role from middleware is: ", adminData.role)

    console.log("Data from body are: ", req.body)
    console.log("Data from files are: ", req.files)

    const { movieTitle, movieDescription, movieDuration, movieReleaseDate, movieIMDbRating, movieGenre, movieLanguage, movieActors, movieDirector, movieAgeRating, movieAvailability, movieTrailerUrl, movieStreamingUrl, movieProductionHouse, movieProducer, movieWriter, movieMusicDirector } = req.body

    const bannerFile = req.files.find(
        (file) => file.fieldname === "bannerUrl"
    );

    const posterFile = req.files.find(
        (file) => file.fieldname === "moviePosterUrl"
    );

    console.log("moviePosterUrl: ", posterFile)
    console.log("bannerUrl: ", bannerFile)

    if (!movieTitle || !movieTitle.trim()) {
        throw new ApiError(400, "Title is required")
    }
    if (!movieDescription || !movieDescription.trim()) {
        throw new ApiError(400, "Description is required")
    }
    if (!movieDuration) {
        throw new ApiError(400, "Duration is required")
    }
    if (!movieReleaseDate) {
        throw new ApiError(400, "Release Date is required")
    }
    if (!movieGenre || movieGenre.length === 0) {
        throw new ApiError(400, "Genre is required")
    }
    if (!movieLanguage || movieLanguage.length === 0) {
        throw new ApiError(400, "Language is required")
    }
    if (!movieActors || movieActors.length === 0) {
        throw new ApiError(400, "Cast is required")
    }
    if (!movieDirector?.trim()) {
        throw new ApiError(400, "Director name is required")
    }
    if (!movieAvailability) {
        throw new ApiError(400, "Availbility type is required")
    }
    if (!movieAgeRating) {
        throw new ApiError(400, "Minimum Age is required")
    }
    if (!movieIMDbRating) {
        throw new ApiError(400, "IMDb rating is required")
    }
    if (movieAvailability !== "Theatre" && !movieStreamingUrl) {
        throw new ApiError(400, "Movie url is required")
    }

    if (!movieTrailerUrl) {
        throw new ApiError(400, "Movie trailer url is required")
    }
    if (!movieProductionHouse || !movieProductionHouse.trim()) {
        throw new ApiError(400, "Movie Production House is required")
    }
    if (!movieWriter || !movieWriter.trim()) {
        throw new ApiError(400, "Movie Writter is required")
    }
    if (!movieMusicDirector || !movieMusicDirector.trim()) {
        throw new ApiError(400, "Movie music director is required")
    }
    if (!movieProducer || !movieProducer.trim()) {
        throw new ApiError(400, "Movie Producer is required")
    }

    console.log("Title is: ", movieTitle)
    console.log("Description is: ", movieDescription)
    console.log("Duration is: ", movieDuration)
    console.log("Release Date is: ", movieReleaseDate)
    console.log("Genre is: ", movieGenre)
    console.log("Cast is: ", movieActors)
    console.log("Language is: ", movieLanguage)
    console.log("Director is: ", movieDirector)
    console.log("Age Rating is: ", movieAgeRating)
    console.log("Availability is: ", movieAvailability)
    console.log("IMDb rating is: ", movieIMDbRating)
    console.log("Movie Url is: ", movieStreamingUrl)
    console.log("Movie trailer url is: ", movieTrailerUrl)
    console.log("Producer is: ", movieProducer)
    console.log("Movie Writter is: ", movieWriter)
    console.log("Music Director is: ", movieMusicDirector)
    console.log("Production House is: ", movieProductionHouse)

    const movieCast = JSON.parse(movieActors);

    const moviePosterLocalPath = posterFile?.path
    if (!moviePosterLocalPath) {
        throw new ApiError(400, "Movie poster is required");
    }

    const movieBannerLocalPath = bannerFile?.path
    if (!movieBannerLocalPath) {
        throw new ApiError(400, "Movie Banner is required");
    }


    const findMovie = await Movie.findOne({
        title: movieTitle,
    })

    if (findMovie) {
        throw new ApiError(409, "Movie is already exist")
    }

    const moviePoster = await uploadOnCloudinary(moviePosterLocalPath)
    if (!moviePoster || !moviePoster.secure_url) {
        throw new ApiError(500, "Failed to upload movie poster");
    }

    console.log("Movie poster secure url: ", moviePoster)

    const movieBanner = await uploadOnCloudinary(movieBannerLocalPath)
    if (!movieBanner || !movieBanner.secure_url) {
        throw new ApiError(500, "Failed to upload movie banner")
    }

    console.log("Movie banner secure url: ", movieBanner)

    const language = JSON.parse(req.body.movieLanguage)
    const genre = JSON.parse(req.body.movieGenre)

    const createMovie = await Movie.create({
        createdBy: adminData._id,
        title: movieTitle.trim(),
        description: movieDescription.trim(),
        duration: movieDuration.trim(),
        releaseDate: movieReleaseDate,
        moviePosterUrl: moviePoster.secure_url,
        movieBannerUrl: movieBanner.secure_url,
        genre: genre,
        language: language,
        cast: movieCast,
        director: movieDirector.trim(),
        ageRating: movieAgeRating,
        availabilityType: movieAvailability,
        streamingVideoUrl: movieStreamingUrl.trim(),
        movietrailerUrl: movieTrailerUrl.trim(),
        imdbRating: movieIMDbRating,
        productionHouse: movieProductionHouse.trim(),
        producer: movieProducer.trim(),
        writer: movieWriter.trim(),
        musicDirector: movieMusicDirector.trim()
    })

    if (!createMovie) {
        throw new ApiError(500, "Error while creating the movie")
    }

    console.log("Movie created: ", createMovie)

    return res.status(201)
        .json(new ApiResponse(201, "Movie add SuccessFull", createMovie))

})

const giveAllActiveMovieByAdmin = asyncHandler(async (req, res, next) => {

    const adminData = req.admin
    if (adminData.role !== "admin") {
        throw new ApiError(403, "Forbidden Admin")
    }

    const { availabilityType } = req.query

    console.log("availabilityType value from url in active movie search is: ", availabilityType)

    console.log("Admin role from middleware is: ", adminData.role)
    console.log("Admin id from middleware is: ", adminData._id)

    const allMovie = await Movie.find({
        createdBy: adminData._id,
        isDeleted: false,
        $or: [
            { availabilityType: availabilityType },
            { availabilityType: "Both" }
        ]
    })

    console.log("All the movie are: ", allMovie)

    return res.status(200)
        .json(new ApiResponse(200, "All movie fetched", { movies: allMovie }))

})

const getAllInActiveMovieByAdmin = asyncHandler(async (req, res, next) => {
    const adminData = req.admin
    if (adminData.role !== "admin") {
        throw new ApiError(403, "Forbidden Admin")
    }

    const { availabilityType } = req.query
    console.log("availabilityType from the url to find inActive movie: ", availabilityType)

    console.log("Admin role from middleware is: ", adminData.role)
    console.log("Admin id from middleware is: ", adminData._id)

    const allInActiveMovie = await Movie.find({
        createdBy: adminData._id,
        isDeleted: true,
        $or: [
            { availabilityType: availabilityType },
            { availabilityType: "Both" }
        ]

    })

    console.log("All in active movies are: ", allInActiveMovie)

    return res.status(200)
        .json(new ApiResponse(200, "All Inactive Movie fetched", { movies: allInActiveMovie }))
})

const getMovieDetails = asyncHandler(async (req, res, next) => {

    const { movieId } = req.params

    const findMovie = await Movie.findById(movieId)
        .select("-createdBy")
    if (!findMovie) {
        throw new ApiError(404, "No movie found")
    }

    console.log("Movie details is: ", findMovie)

    return res.status(200)
        .json(new ApiResponse(200, "Movie Details fetched", findMovie))
})

const getStreamingMovie = asyncHandler(async (req, res, next) => {

    const allMovie = await Movie.find({
        $or: [
            { availabilityType: "Streaming" },
            { availabilityType: "Both" }
        ]
    })
        .select("-createdBy -description -director -genre -cast -language")
    console.log("All movie are: ", allMovie)

    return res.status(200)
        .json(new ApiResponse(200, "All movie fetched", allMovie))
})

const getTheatreMovies = asyncHandler(async (req, res, next) => {

    const allmovie = await Movie.find({
        $or: [
            { availabilityType: "Theatre" },
            { availabilityType: "Both" }
        ]
    })
        .select("-createdBy -description -director -genre -cast -language")

    console.log("All movies are: ", allmovie)

    return res.status(200)
        .json(new ApiResponse(200, "Theatre movies fetched", allmovie))

})

const editMovie = asyncHandler(async (req, res, next) => {

    const adminData = req.admin
    if (adminData.role !== "admin") {
        throw new ApiError(403, "Forbidden Admin")
    }

    console.log("Admin id is: ", adminData._id)

    const { movieId } = req.params;

    if (!movieId || !mongoose.Types.ObjectId.isValid(movieId)) {
        throw new ApiError(400, "Invalid movie id")
    }

    const findMovie = await Movie.findOne({
        createdBy: adminData._id,
        _id: movieId
    })

    if (!findMovie) {
        throw new ApiError(404, "No Movie Found")
    }

    if (Object.keys(req.body || {}).length === 0 && (!req.files || Object.keys(req.files).length === 0)) {
        throw new ApiError(400, "Please provide at least one field to update.");
    }

    console.log("Req body is from the edit movie api: ", req.body);
    console.log("Ref files from the edit movie url: ", req.files);

    const { title, description, duration, releaseDate, imdbRating, genre, language, cast, director, ageRating,
        availabilityType, streamingVideoUrl, movietrailerUrl, productionHouse, producer, writer, musicDirector } = req.body

    const moviePosterUrl = req.files?.moviePosterUrl?.[0];
    const movieBannerUrl = req.files?.bannerUrl?.[0];

    if (title && title.trim()) {
        findMovie.title = title.trim()
    }
    if (description && description.trim()) {
        findMovie.description = description.trim()
    }
    if (moviePosterUrl && moviePosterUrl?.path) {
        const moviePosterSecure_Url = await uploadOnCloudinary(moviePosterUrl?.path)
        if (!moviePosterSecure_Url || !moviePosterSecure_Url.secure_url) {
            throw new ApiError(500, "Failed to upload movie poster");
        }
        findMovie.moviePosterUrl = moviePosterSecure_Url.secure_url
    }
    if (movieBannerUrl && movieBannerUrl?.path) {
        const movieBannerSecure_Url = await uploadOnCloudinary(movieBannerUrl?.path)
        if (!movieBannerSecure_Url || !movieBannerSecure_Url.secure_url) {
            throw new ApiError(500, "Failed to upload movie banner")
        }
        findMovie.movieBannerUrl = movieBannerSecure_Url.secure_url;
    }
    if (duration) {
        findMovie.duration = duration
    }
    if (releaseDate) {
        findMovie.releaseDate = releaseDate
    }
    if (imdbRating) {
        findMovie.imdbRating = imdbRating
    }
    if (genre) {
        findMovie.genre = JSON.parse(genre)
    }
    if (language) {
        findMovie.language = JSON.parse(language)
    }
    if (cast) {
        findMovie.cast = JSON.parse(cast)
    }
    if (director && director.trim()) {
        findMovie.director = director.trim()
    }
    if (ageRating && ageRating.trim()) {
        findMovie.ageRating = ageRating.trim()
    }
    if (availabilityType && availabilityType.trim()) {
        findMovie.availabilityType = availabilityType.trim()
    }
    if (streamingVideoUrl && streamingVideoUrl.trim()) {
        findMovie.streamingVideoUrl = streamingVideoUrl.trim()
    }
    if (movietrailerUrl && movietrailerUrl.trim()) {
        findMovie.movietrailerUrl = movietrailerUrl.trim()
    }
    if (productionHouse && productionHouse.trim()) {
        findMovie.productionHouse = productionHouse.trim()
    }
    if (producer && producer.trim()) {
        findMovie.producer = producer.trim()
    }
    if (writer && writer.trim()) {
        findMovie.writer = writer.trim()
    }
    if (musicDirector && musicDirector.trim()) {
        findMovie.musicDirector = musicDirector.trim()
    }

    await findMovie.save()

    const movieDetails = await Movie.findById(movieId)
        .select("-createdBy")

    return res.status(200)
        .json(new ApiResponse(200, "Movie Details Edited", movieDetails))

})

const DeActivateMovie = asyncHandler(async (req, res, next) => {
    const adminData = req.admin
    if (!adminData || adminData.role !== "admin") {
        throw new ApiError(403, "Forbidden Admin")
    }

    console.log("Admin data is: ", adminData._id)

    const { movieId } = req.params

    if (!movieId || !mongoose.Types.ObjectId.isValid(movieId)) {
        throw new ApiError(400, "Invalid movie id")
    }

    const findMovie = await Movie.findOne({
        createdBy: adminData._id,
        _id: movieId
    })

    if (!findMovie) {
        throw new ApiError(404, "No Movie Found")
    }

    console.log("Movie Details to delete is: ", findMovie)

    if (findMovie.isDeleted) {
        throw new ApiError(400, "Movie is already deleted");
    }

    findMovie.isDeleted = true

    await findMovie.save()

    return res.status(200)
        .json(new ApiResponse(200, "Movie inActivated Successfully", {
            movieId: findMovie._id,
            isDeleted: findMovie.isDeleted
        }))

})

const activateMovie = asyncHandler(async (req, res, next) => {
    const adminData = req.admin
    if (adminData.role !== "admin" || !adminData) {
        throw new ApiError(403, "Forbidden Admin")
    }

    console.log("Admin role is: ", adminData.role)
    console.log("Admin id is: ", adminData._id)

    const { movieId } = req.params

    const findMovie = await Movie.findOne({
        _id: movieId,
        createdBy: adminData._id
    })

    if (!findMovie) {
        throw new ApiError(404, "No Movie Found")
    }

    console.log("Movie details to make active is: ", findMovie)

    if (!findMovie.isDeleted) {
        throw new ApiError(400, "Movie is already added");
    }

    findMovie.isDeleted = false;
    await findMovie.save()

    return res.status(200)
        .json(new ApiResponse(200, "Movie activated successfully", {
            movieId: findMovie._id,
            isDeleted: findMovie.isDeleted
        }))
})

export { createMovie, giveAllActiveMovieByAdmin, getAllInActiveMovieByAdmin, getMovieDetails, getStreamingMovie, getTheatreMovies, editMovie, DeActivateMovie, activateMovie }
