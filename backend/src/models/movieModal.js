import mongoose, { Schema } from "mongoose";

const movieSchema = new Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true,
        index: true
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        trim: true,
    },
    moviePosterUrl: {
        type: String,
        required: [true, "Url is required"],
    },
    duration: {
        type: Number,
        required: [true, "Duration is required"],
    },
    releaseYear: {
        type: Number,
        required: [true, "Release Year is required"],
        min: 1900,
        max: new Date().getFullYear() + 5
    },
    imdbRating: {
        type: Number,
        index: true,
        min: 0,
        max: 10,
    },
    cineVerseRating: {
        type: Number,
        index: true,
        min: 0,
        max: 5,
        default: 0,
    },
    totalRatings: {
        type: Number,
        default: 0,
    },
    likesCount: {
        type: Number,
        default: 0,
    },
    dislikesCount: {
        type: Number,
        default: 0,
    },
    genre: {
        type: [String],
        required: [true, "Genre is required"]
    },
    language: {
        type: [String],
        required: [true, "Language is required"]
    },
    cast: {
        type: [String],
        required: [true, "Cast is required"]
    },
    director: {
        type: String,
        required: [true, "Director is required"],
        trim: true,
    },
    ageRating: {
        type: String,
        enum: ["U", "UA", "A"],
        required: [true, "Age Rating is required"],
    },
    availabilityType: {
        type: String,
        required: [true, "Availability is required"],
        enum: ["Theatre", "Streaming", "Both"]
    },
    streamingVideoUrl: {
        type: String,
    }
}, { timestamps: true })

export const Movie = mongoose.model("Movie", movieSchema)