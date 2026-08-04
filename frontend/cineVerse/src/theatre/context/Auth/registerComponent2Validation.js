function registerComponent2Validation(theatreDetails) {
    const errors = {}

    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    const aadharRegex = /^\d{12}$/;
    const pincodeRegex = /^[1-9][0-9]{5}$/;

    console.log("Theater details in step 2 is: ", theatreDetails)

    if (!theatreDetails.country?.trim()) {
        errors.country = "*Country is required"
    }

    if (!theatreDetails.state?.trim()) {
        errors.state = "*State is required"
    }

    if (!theatreDetails.district?.trim()) {
        errors.district = "*District is required"
    }

    if (!theatreDetails.city?.trim()) {
        errors.city = "*City is required"
    }
    else if (theatreDetails.city.length > 50) {
        errors.city = "*City name is too long";
    }

    if (!theatreDetails.landmark?.trim()) {
        errors.landmark = "*Landmark is required"
    }

    if (!theatreDetails.pincode?.trim()) {
        errors.pincode = "*Pincode is required"
    }
    else if (!pincodeRegex.test(theatreDetails.pincode)) {
        errors.pincode = "*Enter correct pincode"
    }

    if (!theatreDetails.aadharNumber.trim()) {
        errors.aadharNumber = "*Aadhar Number is required"
    }
    else if (!aadharRegex.test(theatreDetails.aadharNumber)) {
        errors.aadharNumber = "*Enter correct Aadhar Number"
    }

    if (!theatreDetails.panNumber.trim()) {
        errors.panNumber = "*Pan Number is required"
    }
    else if (!panRegex.test(theatreDetails.panNumber.toUpperCase())) {
        errors.panNumber = "*Enter correct Pan number"
    }

    if (!theatreDetails.ownerPhoto) {
        errors.ownerPhoto = "*Owner image is required"
    }

    return errors;
}

export default registerComponent2Validation