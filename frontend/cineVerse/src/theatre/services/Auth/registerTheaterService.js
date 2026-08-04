async function registerTheaterService(theatreDetails) {

    console.log("Theatre Details to send to backend is:", theatreDetails);

    try {

        const formData = new FormData();

        formData.append("ownerName", theatreDetails.fullname);
        formData.append("ownerEmail", theatreDetails.email);
        formData.append("ownerMobileNumber", theatreDetails.mobileNumber);
        formData.append("ownerAlternateMobileNo", theatreDetails.optionalMobileNumber);

        formData.append("ownerCountry", theatreDetails.country);
        formData.append("ownerState", theatreDetails.state);
        formData.append("ownerDistrict", theatreDetails.district);
        formData.append("ownerCity", theatreDetails.city);
        formData.append("ownerTown", theatreDetails.town);
        formData.append("ownerLandMark", theatreDetails.landmark);
        formData.append("ownerPinCode", theatreDetails.pincode);

        formData.append("ownerAadharNo", theatreDetails.aadharNumber);
        formData.append("ownerPanNumber", theatreDetails.panNumber);

        formData.append("theatreName", theatreDetails.theatreName);
        formData.append("theatreDescription", theatreDetails.theatreDescription);
        formData.append("theatreContactNo", theatreDetails.theatreContactNo);
        formData.append("theatreIsBookingAvailable", theatreDetails.theatreIsBookingAvailable);
        formData.append("theatreGSTNumber", theatreDetails.theatreGSTNumber);

        formData.append("theatreCountry", theatreDetails.theatreCountry);
        formData.append("theatreState", theatreDetails.theatreState);
        formData.append("theatreDistrict", theatreDetails.theatreDistrict);
        formData.append("theatreCity", theatreDetails.theatreCity);
        formData.append("theatreLandMark", theatreDetails.theatreLandMark);
        formData.append("theatrePinCode", theatreDetails.theatrePinCode);

        formData.append("ownerPhoto", theatreDetails.ownerPhoto);

        theatreDetails.theatreImages.forEach((image) => {
            formData.append("theatreImages", image);
        });

        const response = await fetch("http://localhost:8000/cineVerse/app/api/theatre/register-theatre", {
            method: "POST",
            credentials: "include",
            body: formData
        })

        const data = await response.json();
        console.log("Data from backend is: ", data)

        if (!response.ok) {
            console.log("Data recived from the register theatre owner backend is: ", data.message || data)
            throw new Error(data.message || "Error while registering theatre");
        }

        return data;

    } catch (error) {
        console.log("Error from backend is:", error);
        throw error;
    }
}

export default registerTheaterService;