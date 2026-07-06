import validator from "validator"
function loginDetails(userDetails) {
    const errors = {}
    const passwordRegix = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,15}$/;

    console.log("User details in login validation in frontend", userDetails)
    if (!userDetails.email.trim()) {
        errors.email = "*Email is required";
    }
    else if (!validator.isEmail(userDetails.email.trim())) {
        errors.email = "*Enter the correct email. @gmail.com is required"
    }
    if (!userDetails.password.trim()) {
        errors.password = "*Passowrd is required"
    }
    else if (userDetails.password.length > 15 || userDetails.password.length < 8) {
        errors.password = "*Password length must be greater than 8 and less than 16"
    }
    else if (!passwordRegix.test(userDetails.password.trim())) {
        errors.password = "*Atleast 1 lowercase, 1 uppercase and 1 number is reuired"
    }
    return errors;

}

export default loginDetails