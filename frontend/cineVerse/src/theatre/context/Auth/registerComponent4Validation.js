function registerComponent4Validation(theatreDetails) {

    console.log("Theatre Details of register component 4 validation is: ", theatreDetails)

    const errors = {}
    const pincodeRegex = /^[1-9][0-9]{5}$/;

    if (!theatreDetails.theatreCountry?.trim()) {
        errors.theatreCountry = "*Country Value is required"
    }

    if (!theatreDetails.theatreState?.trim()) {
        errors.theatreState = "*State Value is required"
    }

    if (!theatreDetails.theatreDistrict?.trim()) {
        errors.theatreDistrict = "*District value is required"
    }
    
    if (!theatreDetails.theatreCity?.trim()) {
        errors.theatreCity = "*City value is required"
    }

    if (!theatreDetails.theatreLandMark?.trim()) {
        errors.theatreLandMark = "*Landmark value is required"
    }

    if (!theatreDetails.theatrePinCode?.trim()) {
        errors.theatrePinCode = "*Pincode is required"
    }
    else if (!pincodeRegex.test(theatreDetails.theatrePinCode?.trim())) {
        errors.theatrePinCode = "*Enter correct PinCode"
    }

    return errors;
}

export default registerComponent4Validation