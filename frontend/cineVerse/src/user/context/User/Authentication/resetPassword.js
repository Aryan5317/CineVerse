function resetPasswordValidation(passwordDetails) {
    console.log("Password Details: ", passwordDetails)
    const passwordRegix = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,15}$/;
    const errors = {}
    if (!passwordDetails.newPassword.trim()) {
        errors.newPassword = "*New Password field is required"
    }
    else if (!(passwordDetails.newPassword.length > 8 && passwordDetails.newPassword.length < 16)) {
        errors.newPassword = "*Password length must be between 8 to 15"
    }
    else if (!passwordRegix.test(passwordDetails.newPassword)) {
        errors.newPassword = "*Atleast 1 lowercase, 1 uppercase and 1 number is reuired"
    }

    if (!passwordDetails.confirmPassword.trim()) {
        errors.confirmPassword = "*Confirm Password field is required"
    }
    else if (!(passwordDetails.confirmPassword.length > 8 && passwordDetails.confirmPassword.length < 16)) {
        errors.confirmPassword = "*Confirm Password length must be between 8 to 15"
    }
    else if (!passwordRegix.test(passwordDetails.confirmPassword)) {
        errors.confirmPassword = "*Atleast 1 lowercase, 1 uppercase and 1 number is reuired"
    }

    if(passwordDetails.newPassword !== passwordDetails.confirmPassword){
        errors.password = "*Confirm Password and New Password must be same"
    }

    return errors

}

export default resetPasswordValidation