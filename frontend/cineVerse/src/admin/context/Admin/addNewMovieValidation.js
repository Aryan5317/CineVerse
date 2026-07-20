function addNewMovieValidation(movieDetails) {

    console.log("Movie details received for validation:", movieDetails);

    const errors = {};

    if (!movieDetails.moviePosterUrl) {
        errors.moviePosterUrl = "*Movie Poster is required";
    }

    if (!movieDetails.bannerUrl) {
        errors.bannerUrl = "*Banner Image is required";
    }

    if (!movieDetails.movieTitle?.trim()) {
        errors.movieTitle = "*Movie Title is required";
    }

    if (!movieDetails.movieDescription?.trim()) {
        errors.movieDescription = "*Movie Description is required";
    }

    if (!movieDetails.movieDirector?.trim()) {
        errors.movieDirector = "*Movie Director is required";
    }
    if(!movieDetails.productionHouse?.trim()){
        errors.productionHouse = "*Movie Production House is required"
    }
    if(!movieDetails.producer?.trim()){
        errors.producer = "*Movie Producer is required"
    }
    if(!movieDetails.writer?.trim()){
        errors.writer = "*Movie Writter is required"
    }
    if(!movieDetails.musicDirector?.trim()){
        errors.musicDirector = "*Movie Music Director is required"
    }

    if (!movieDetails.movieReleaseDate) {
        errors.movieReleaseDate = "*Movie Release Date is required";
    }

    if (!movieDetails.movieDuration || Number(movieDetails.movieDuration) <= 0) {
        errors.movieDuration = "*Valid Movie Duration is required";
    }

    if (!movieDetails.movieAgeRating) {
        errors.movieAgeRating = "*Movie Age Rating is required";
    }

    if (!movieDetails.movieGenre || movieDetails.movieGenre.length === 0) {
        errors.movieGenre = "*At least one Movie Genre is required";
    }

    if (!movieDetails.movieLanguage || movieDetails.movieLanguage.length === 0) {
        errors.movieLanguage = "*At least one Movie Language is required";
    }

    if (!movieDetails.movieActors || movieDetails.movieActors.length === 0) {
        errors.movieActors = "*At least one Movie Actor is required";
    }

    if (
        movieDetails.movieIMDbRating === "" ||
        movieDetails.movieIMDbRating === null ||
        movieDetails.movieIMDbRating === undefined
    ) {
        errors.movieIMDbRating = "*IMDb Rating is required";
    } else if (
        Number(movieDetails.movieIMDbRating) < 0 ||
        Number(movieDetails.movieIMDbRating) > 10
    ) {
        errors.movieIMDbRating = "*IMDb Rating must be between 0 and 10";
    }

    if (!movieDetails.movieAvailability) {
        errors.movieAvailability = "*Movie Availability is required";
    }

    if (!movieDetails.movieTrailerUrl) {
        errors.movieTrailerUrl = "*Movie Trailer is required";
    }

    if (!movieDetails.movieStreamingUrl && movieDetails.movieAvailability !== "Theatre") {
        errors.movieStreamingUrl = "*Movie Streaming URL is required";
    }


    return errors;
}

export default addNewMovieValidation;