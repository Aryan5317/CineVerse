import validator from "validator";

function loginDetailsValidation(loginDetails) {

    const errors = {};
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,15}$/;

    console.log("Theatre Login Details for validation is:", loginDetails);

    if (!loginDetails.email.trim()) {
        errors.email = "*Email is required";
    }
    else if (!validator.isEmail(loginDetails.email.trim())) {
        errors.email = "*Enter a valid email address";
    }

    if (!loginDetails.password.trim()) {
        errors.password = "*Password is required";
    }
    else if (!passwordRegex.test(loginDetails.password.trim())) {
        errors.password = "*Password must contain 8-15 characters, at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character.";
    }

    return errors;
}

export default loginDetailsValidation;