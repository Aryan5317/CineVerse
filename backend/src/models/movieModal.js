import mongoose, { Schema } from "mongoose";

const movieSchema = new Schema({
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "Admin",
        required: true,
        index: true
    },
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
    movieBannerUrl: {
        type: String,
        required: [true, "Url is required"],
    },
    duration: {
        type: Number,
        required: [true, "Duration is required"],
    },
    releaseDate: {
        type: Date,
        required: [true, "Release Date is required"],
        min: new Date("1900-01-01"),
        max: new Date(new Date().getFullYear() + 5, 11, 31)
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
        index: true,
        required: [true, "Genre is required"]
    },
    language: {
        type: [String],
        index: true,
        required: [true, "Language is required"]
    },
    cast: [
        {
            actorName: {
                type: String,
                required: [true, "Cast is required"]
            },
            actorGender: {
                type: String,
                required: [true, "Cast is required"]
            }
        }
    ],
    director: {
        type: String,
        required: [true, "Director is required"],
        trim: true,
    },
    ageRating: {
        type: String,
        enum: [
            "U (Below 7)",
            "U (13+)",
            "U/A (16+)",
            "A (18+)"
        ],
        required: [true, "Age Rating is required"],
    },
    availabilityType: {
        type: String,
        index: true,
        required: [true, "Availability is required"],
        enum: ["Theatre", "Streaming", "Both"]
    },
    streamingVideoUrl: {
        type: String,
    },
    movietrailerUrl: {
        type: String,
    },
    productionHouse: {
        type: String,
        required: true,
        trim: true,
        index: true,
    },
    producer: {
        type: String,
        requird: true,
        trim: true,
    },
    writer: {
        type: String,
        requird: true,
        trim: true,
    },
    musicDirector: {
        type: String,
        requird: true,
        trim: true,
    }
}, { timestamps: true })

export const Movie = mongoose.model("Movie", movieSchema)