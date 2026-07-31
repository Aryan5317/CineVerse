async function editMovieDetails(movieDetails, movieId) {

    console.log("Movie id received for movie details update is:", movieId)
    console.log("Movie Details update is:", movieDetails)
    console.log(movieDetails.movieBanner);
    console.log(movieDetails.bannerUrl);

    console.log(movieDetails.moviePoster);
    console.log(movieDetails.moviePosterUrl);

    try {

        const formData = new FormData()

        formData.append("title", movieDetails.title)
        formData.append("description", movieDetails.description)
        formData.append("duration", movieDetails.duration)
        formData.append("releaseDate", movieDetails.releaseDate)
        formData.append("imdbRating", movieDetails.imdbRating)
        formData.append("director", movieDetails.director)
        formData.append("ageRating", movieDetails.ageRating)
        formData.append("availabilityType", movieDetails.availabilityType)
        formData.append("streamingVideoUrl", movieDetails.streamingVideoUrl)
        formData.append("movietrailerUrl", movieDetails.movietrailerUrl)
        formData.append("productionHouse", movieDetails.productionHouse)
        formData.append("producer", movieDetails.producer)
        formData.append("writer", movieDetails.writer)
        formData.append("musicDirector", movieDetails.musicDirector)

        formData.append("genre", JSON.stringify(movieDetails.movieGenre))
        formData.append("language", JSON.stringify(movieDetails.movieLanguage))
        formData.append("cast", JSON.stringify(movieDetails.cast))

        if (movieDetails.moviePoster instanceof File) {
            formData.append("moviePosterUrl", movieDetails.moviePoster);
        }

        if (movieDetails.movieBanner instanceof File) {
            formData.append("bannerUrl", movieDetails.movieBanner);
        }

        const response = await fetch(
            `http://localhost:8000/cineVerse/app/api/movies/admin/edit-movie/${movieId}`,
            {
                method: "PATCH",
                credentials: "include",
                body: formData
            }
        )

        const data = await response.json()

        console.log("Data received from the backend is:", data.message)

        if (!response.ok) {
            throw new Error(data.message || "Error while updating movie details")
        }

        return data

    } catch (error) {
        console.log("Error from backend is:", error)
        throw error
    }
}

export default editMovieDetails