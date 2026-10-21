function addNewShow(showDetails) {
    console.log("Show Details is: ", showDetails)
    console.log("Show Duration is: ", showDetails.showsDuration)

    const error = {}

    if (!showDetails.movieName || showDetails.movieName === "") {
        error.movieName = "*Movie Name is required"
    }

    if (!showDetails.screenNumber || showDetails.screenNumber < 1) {
        error.screenNumber = "*Screen Number is required"
    }

    if (!showDetails.showStatus || showDetails.showStatus === "") {
        error.showStatus = "*Show Status is required"
    }

    if (
        !showDetails.showsDuration ||
        showDetails.showsDuration === "" ||
        showDetails.showsDuration < 1
    ) {
        error.showsDuration = "*Show Duration is required"
    }

    if (!showDetails.showsDate || showDetails.showsDate === "") {
        error.showsDate = "*Show Date is required"
    }

    if (!showDetails.showsStartTime || showDetails.showsStartTime === "") {
        error.showsStartTime = "*Show start time is required"
    }

    if (!showDetails.seatPrices || showDetails.seatPrices.length === 0) {
        error.seatPrices = "*Seat Prices is required"
    } else {
        for (let i = 0; i < showDetails.seatPrices.length; i++) {
            if (
                !showDetails.seatPrices[i].price ||
                showDetails.seatPrices[i].price === "" ||
                showDetails.seatPrices[i].price < 0
            ) {
                error.price = "*Enter Correct Seat Price"
                break
            }
        }
    }

    if (!showDetails.showImage) {
        error.showImage = "*Show Image is required"
    }

    return error
}

export default addNewShow