import validator from "validator"

function loginValidation(loginDetails) {
    console.log("login value for validation: ", loginDetails)
    const passwordRegix = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,15}$/;

    const errors = {};

    if (!loginDetails.email) {
        errors.email = "*Email field is required"
    }
    else if (!validator.isEmail(loginDetails.email)) {
        errors.email = "*Enter correct email format.Must end with @gmail.com"
    }

    if (!loginDetails.password) {
        errors.password = "*Password field is required"
    }
    else if (!(passwordRegix.test(loginDetails.password))){
        errors.password = "*Atleast 1 lowercase, 1 uppercase and 1 number is reuired.Password length must be in between 8 to 15"
    }

    return errors;
}

export default loginValidation