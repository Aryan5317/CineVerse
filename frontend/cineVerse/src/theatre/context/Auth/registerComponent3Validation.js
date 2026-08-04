function registerComponent3Validation(theatreDetails) {

    console.log("Theatre details for validation in register component 3 is: ", theatreDetails)

    const errors = {}
    const mobileRegex = /^[6-9]\d{9}$/;
    const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/;

    if (!theatreDetails.theatreName?.trim()) {
        errors.theatreName = "*Theatre Name is required"
    }

    if (!theatreDetails.theatreDescription?.trim()) {
        errors.theatreDescription = "*Theatre Description is required"
    }

    if (!theatreDetails.theatreContactNo?.trim()) {
        errors.theatreContactNo = "*Theatre Contact Number is required"
    }
    else if (!mobileRegex.test(theatreDetails.theatreContactNo?.trim())) {
        errors.theatreContactNo = "*Enter correct Mobile Number"
    }
    if (!theatreDetails.theatreIsBookingAvailable) {
        errors.theatreIsBookingAvailable = "*Please select the theatre booking availability.";
    }
    if (!theatreDetails.theatreGSTNumber?.trim()) {
        errors.theatreGSTNumber = "*GST Number is required"
    }
    else if (!gstRegex.test(theatreDetails.theatreGSTNumber?.trim().toUpperCase())) {
        errors.theatreGSTNumber = "*Enter correct GST Number"
    }

    if (!theatreDetails.theatreImages || theatreDetails.theatreImages.length === 0) {
        errors.theatreImages = "*Upload the images"
    }
    else if (!theatreDetails.theatreImages || theatreDetails.theatreImages.length < 5) {
        errors.theatreImages = "*Upload at least 5 images."
    }
    else if (!theatreDetails.theatreImages || theatreDetails.theatreImages.length > 8) {
        errors.theatreImages = "*Maximum 8 images are allowed."
    }
    return errors
}

export default registerComponent3Validation