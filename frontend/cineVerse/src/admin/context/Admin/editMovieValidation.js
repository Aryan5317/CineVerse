function editMovieValidation(updatedMovieDetails) {

    const errors = {}

    if (
        updatedMovieDetails.title &&
        updatedMovieDetails.title.trim().length < 2
    ) {
        errors.title = "Movie title must contain at least 2 characters."
    }

    if (
        updatedMovieDetails.description &&
        updatedMovieDetails.description.trim().length < 10
    ) {
        errors.description = "Description must contain at least 10 characters."
    }

    if (
        updatedMovieDetails.duration &&
        (
            isNaN(updatedMovieDetails.duration) ||
            Number(updatedMovieDetails.duration) <= 0
        )
    ) {
        errors.duration = "Duration must be greater than 0."
    }

    if (
        updatedMovieDetails.imdbRating !== "" &&
        updatedMovieDetails.imdbRating !== undefined &&
        (
            Number(updatedMovieDetails.imdbRating) < 0 ||
            Number(updatedMovieDetails.imdbRating) > 10
        )
    ) {
        errors.imdbRating = "IMDb rating must be between 0 and 10."
    }

    if (
        updatedMovieDetails.releaseDate &&
        isNaN(new Date(updatedMovieDetails.releaseDate).getTime())
    ) {
        errors.releaseDate = "Please select a valid release date."
    }

    if (
        updatedMovieDetails.streamingVideoUrl &&
        !/^https?:\/\/.+/i.test(updatedMovieDetails.streamingVideoUrl)
    ) {
        errors.streamingVideoUrl = "Please enter a valid streaming URL."
    }

    if (
        updatedMovieDetails.movietrailerUrl &&
        !/^https?:\/\/.+/i.test(updatedMovieDetails.movietrailerUrl)
    ) {
        errors.movietrailerUrl = "Please enter a valid trailer URL."
    }

    if (
        updatedMovieDetails.movieGenre &&
        updatedMovieDetails.movieGenre.length === 0
    ) {
        errors.movieGenre = "Select at least one genre."
    }

    if (
        updatedMovieDetails.movieLanguage &&
        updatedMovieDetails.movieLanguage.length === 0
    ) {
        errors.movieLanguage = "Select at least one language."
    }

    if (updatedMovieDetails.cast) {

        updatedMovieDetails.cast.forEach((actor, index) => {

            if (!actor.actorName?.trim()) {
                errors[`actorName${index}`] = `Actor ${index + 1} name is required.`
            }

            if (!actor.actorGender?.trim()) {
                errors[`actorGender${index}`] = `Actor ${index + 1} gender is required.`
            }

        })

    }

    return errors
}

export default editMovieValidation