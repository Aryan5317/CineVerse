import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { Movie } from "../models/movieModal.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import ApiError from "../utils/errorHandling.js";

const addMovie = asyncHandler(async (req, res, next) => {
    const { title, description, duration, releaseYear, imdbRating, genre, language, cast, director, ageRating, availabilityType } = req.body

    if (!title || !title.trim()) {
        throw new ApiError(400, "Title is required")
    }
    if (!description || !description.trim()) {
        throw new ApiError(400, "Description is required")
    }
    if (!duration) {
        throw new ApiError(400, "Duration is required")
    }
    if (!releaseYear) {
        throw new ApiError(400, "Release Year is required")
    }
    if (!genre || genre.length === 0) {
        throw new ApiError(400, "Genre is required")
    }
    if (!language || language.length === 0) {
        throw new ApiError(400, "Language is required")
    }
    if (!cast || cast.length === 0) {
        throw new ApiError(400, "Cast is required")
    }
    if (!director?.trim()) {
        throw new ApiError(400, "Director name is required")
    }
    if (!availabilityType) {
        throw new ApiError(400, "Availbility type is required")
    }
    if (!ageRating) {
        throw new ApiError(400, "Minimum Age is required")
    }

    console.log("Title is: ", title)
    console.log("Description is: ", description)
    console.log("Duration is: ", duration)
    console.log("Release Year is: ", releaseYear)
    console.log("Genre is: ", genre)
    console.log("Cast is: ", cast)
    console.log("Language is: ", language)
    console.log("Director is: ", director)
    console.log("Age Rating is: ", ageRating)
    console.log("Availability is: ", availabilityType)

    const moviePosterLocalPath = req.file?.path
    if (!moviePosterLocalPath) {
        throw new ApiError(400, "Movie poster is required");
    }


    const findMovie = await Movie.findOne({
        title: title,
    })

    if (findMovie) {
        throw new ApiError(409, "Movie is already exist")
    }

    const moviePoster = await uploadOnCloudinary(moviePosterLocalPath)
    if (!moviePoster || !moviePoster.secure_url) {
        throw new ApiError(500, "Failed to upload movie poster");
    }

    const createMovie = await Movie.create({
        title: title.trim(),
        description: description.trim(),
        duration: duration,
        releaseYear: releaseYear,
        moviePosterUrl: moviePoster.secure_url,
        genre,
        language,
        cast,
        director: director.trim(),
        ageRating,
        availabilityType,
    })

    if (!createMovie) {
        throw new ApiError(500, "Error while creating the movie")
    }

    console.log("Movie created: ", createMovie)

    return res.status(201)
        .json(new ApiResponse(201, "Movie add SuccessFull", createMovie))
})

export { addMovie }