import validator from "validator"
function registerComponent1Validation(registerValue) {

    const mobileRegex = /^[6-9]\d{9}$/;
    const errors = {}

    console.log("Register value recived for validation is: ", registerValue)

    if (!registerValue.fullname?.trim()) {
        errors.fullname = "*Owner Name is required"
    }

    if (!registerValue.email?.trim()) {
        errors.email = "*Owner email is required"
    }
    else if (!validator.isEmail(registerValue.email)) {
        errors.email = "*Enter correct email"
    }
    if (!registerValue.mobileNumber?.trim()) {
        errors.mobileNumber = "*Owner Mobile Number is required"
    }
    else if (!mobileRegex.test(registerValue.mobileNumber.trim())) {
        errors.mobileNumber = "*Enter a valid 10-digit mobile number";
    }

    if (registerValue.optionalMobileNumber?.trim() && !mobileRegex.test(registerValue.optionalMobileNumber.trim())) {
        errors.optionalMobileNumber = "*Enter a valid 10-digit mobile number";
    }
    return errors;
}

export default registerComponent1Validation