async function publishNewMovie(movieDetails) {
    console.log("Movie Details recived for upload is: ", movieDetails)


    const dataToSend = new FormData();

    dataToSend.append("bannerUrl", movieDetails?.bannerUrl);
    dataToSend.append("moviePosterUrl", movieDetails?.moviePosterUrl);

    dataToSend.append("movieTitle", movieDetails.movieTitle);
    dataToSend.append("movieDescription", movieDetails.movieDescription);
    dataToSend.append("movieReleaseDate", movieDetails.movieReleaseDate);
    dataToSend.append("movieDuration", movieDetails.movieDuration);
    dataToSend.append("movieAgeRating", movieDetails.movieAgeRating);
    dataToSend.append("movieDirector", movieDetails.movieDirector);
    dataToSend.append("movieIMDbRating", movieDetails.movieIMDbRating);
    dataToSend.append("movieAvailability", movieDetails.movieAvailability);
    dataToSend.append("movieTrailerUrl", movieDetails?.movieTrailerUrl);
    dataToSend.append("movieStreamingUrl", movieDetails?.movieStreamingUrl);
    dataToSend.append("movieProductionHouse", movieDetails.productionHouse);
    dataToSend.append("movieProducer", movieDetails.producer);
    dataToSend.append("movieWriter", movieDetails.writer);
    dataToSend.append("movieMusicDirector", movieDetails.musicDirector)

    dataToSend.append("movieGenre", JSON.stringify(movieDetails.movieGenre));
    dataToSend.append("movieLanguage", JSON.stringify(movieDetails.movieLanguage));
    dataToSend.append("movieActors", JSON.stringify(movieDetails.movieActors));


    console.log("Data to send to backend is creating the movie: ", dataToSend)
    for (const [key, value] of dataToSend.entries()) {
        console.log(key, value);
    }

    try {
        const response = await fetch("http://localhost:8000/cineVerse/app/api/movies/createMovie", {
            method: "POST",
            credentials: "include",
            body: dataToSend
        })

        const data = await response.json()
        console.log("Data from backend is: ", data)

        if (!response.ok) {
            console.log("Error from backend while adding a movie: ", data.message || data)
            throw new Error(data.message || "Movie Addition failed")
        }
        return data
    } catch (error) {
        console.log("Error from backend is: ", error)
        throw error
    }
}

export default publishNewMovie