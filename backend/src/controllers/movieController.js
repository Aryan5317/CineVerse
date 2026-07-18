import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { Movie } from "../models/movieModal.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import ApiError from "../utils/errorHandling.js";

const addMovie = asyncHandler(async (req, res, next) => {

    const adminData = req.admin
    if (adminData.role !== "admin") {
        throw new ApiError(403, "Forbidden Admin")
    }

    console.log("Admin role from middleware is: ", adminData.role)

    console.log("Data from body are: ", req.body)
    console.log("Data from files are: ", req.files)

    const { movieTitle, movieDescription, movieDuration, movieReleaseDate, movieIMDbRating, movieGenre, movieLanguage, movieActors, movieDirector, movieAgeRating, movieAvailability, movieTrailerUrl, movieStreamingUrl } = req.body

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

    const createMovie = await Movie.create({
        createdBy: adminData._id,
        title: movieTitle.trim(),
        description: movieDescription.trim(),
        duration: movieDuration.trim(),
        releaseDate: movieReleaseDate,
        moviePosterUrl: moviePoster.secure_url,
        movieBannerUrl: movieBanner.secure_url,
        genre: movieGenre,
        language: movieLanguage,
        cast: movieCast,
        director: movieDirector.trim(),
        ageRating: movieAgeRating,
        availabilityType: movieAvailability,
        streamingVideoUrl: movieStreamingUrl.trim(),
        movietrailerUrl: movieTrailerUrl.trim()
    })

    if (!createMovie) {
        throw new ApiError(500, "Error while creating the movie")
    }

    console.log("Movie created: ", createMovie)

    return res.status(201)
        .json(new ApiResponse(201, "Movie add SuccessFull", createMovie))

})

const giveAllMovie = asyncHandler(async (req, res, next) => {

    const adminData = req.admin
    if (adminData.role !== "admin") {
        throw new ApiError(403, "Forbidden Admin")
    }

    console.log("Admin role from middleware is: ", adminData.role)
    console.log("Admin id from middleware is: ", adminData._id)

    const allMovie = await Movie.find({
        createdBy: adminData._id
    })

    console.log("All the movie are: ", allMovie)

    return res.status(200)
        .json(new ApiResponse(200, "All movie fetched", { movies: allMovie }))

})

export { addMovie, giveAllMovie }
