async function addNewShowsService(showsDetails, theatreId) {
    console.log("Show Details is: ", showsDetails)
    try {

        const formData = new FormData();

        formData.append("movieName", showsDetails.movieName)
        formData.append("screenNumber", showsDetails.screenNumber)
        formData.append("showStatus", showsDetails.showStatus)
        formData.append("showsDate", showsDetails.showsDate)
        formData.append("showsDuration", showsDetails.showsDuration)
        formData.append("showsStartTime", showsDetails.showsStartTime)
        formData.append("seatPrices", JSON.stringify(showsDetails.seatPrices))
        formData.append("showImage", showsDetails.showImage)


        console.log("FormData is: ", formData)

        const response = await fetch(`http://localhost:8000/cineVerse/app/api/shows/add-new-show/${theatreId}`, {
            method: "POST",
            credentials: "include",
            body: formData
        })

        const data = await response.json()

        console.log("Data from backend is: ", data)

        if (!response.ok) {
            console.log("Error from backend while adding new show is: ", data.message || data)
            throw new Error(data.message || data)
        }
        return data
    } catch (error) {
        console.log("Error from backend is: ", error)
        throw error;
    }
}


export default addNewShowsService