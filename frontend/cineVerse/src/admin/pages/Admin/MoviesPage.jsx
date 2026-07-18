import React from "react"
import { useState, useEffect } from "react"
import getAllMovie from "../../services/Admin/getAllMovie.js"

function MoviesPage() {

    const [movieTitle, setMovieTitile] = useState("")
    const [movieData, setMovieData] = useState([])

    useEffect(() => {
        const moviesDetails = async () => {
            try {
                const movieDetailsResponse = await getAllMovie()
                console.log("Movie details recived are: ", movieDetailsResponse.data.movies)
                if (movieDetailsResponse) {
                    setMovieData(movieDetailsResponse.data.movies)
                }
            } catch (error) {
                console.log("Error from backend while fetching movie details is: ", error)
                setMovieData({})
            }
        }
        moviesDetails()
    }, [])

    return (
        <>
            <div>
                <div>
                    <h1>Movies</h1>
                    <p>Manage your movie library</p>
                </div>
                <div>
                    <div>
                        <h1>Search Movies</h1>
                    </div>
                    <div>
                        <h1>🔍</h1>
                        <input type="text" placeholder="Search by title..." />
                    </div>
                    <div></div>
                    <div>
                        <h1>Availability</h1>
                    </div>
                </div>

                <div>
                    <h1>Movies</h1>
                    <div>
                        {movieData.map((movie, index) => {
                            console.log("Movie is:", movie);

                            return (

                                <div key={index}>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

        </>
    )
}

export default MoviesPage