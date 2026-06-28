import validator from "validator"

function registerDetails(userDetails, checkboxValue) {
    const error = {}
    console.log("UserDetails for register in validation is: ", userDetails)
    console.log("CheckBox value in register validation is: ", checkboxValue)

    const passwordRegix = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,15}$/;
    if (!userDetails.fullname.trim()) {
        error.fullname = "*Name field is required."
    }
    if (!userDetails.email) {
        error.email = "*Email field is required."
    }
    else if (!validator.isEmail(userDetails.email.trim())) {
        error.email = "*Enter correct email address."
    }
    if (!userDetails.password) {
        error.password = "*Password field is required."
    }
    else if (!passwordRegix.test(userDetails.password.trim())) {
        error.password = "*Atleast 1 lowercase, 1 uppercase and 1 number is required and Password length must be in between 8 to 15"
    }
    if (!userDetails.mobileNumber) {
        error.mobileNumber = "*Mobile Number field is required."
    }
    else if (!validator.isMobilePhone(userDetails.mobileNumber.trim(), "en-IN")) {
        error.mobileNumber = "*Enter correct mobile number."
    }
    if (!checkboxValue) {
        error.checkbox = "*Must be checked."
    }
    return error
}

export default registerDetails