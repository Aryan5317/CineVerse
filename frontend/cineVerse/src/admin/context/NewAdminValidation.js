import validator from "validator"
function newAdminValidation(newAdminDetails) {
    console.log("Admin Details for validation is: ", newAdminDetails)
    const passwordRegix = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,15}$/;
    const errors = {}
    if (!newAdminDetails.fullname.trim()) {
        errors.fullname = "*Fullname feild is required"
    }
    if (!newAdminDetails.email.trim()) {
        errors.email = "*Email feild is required"
    }
    else if (!validator.isEmail(newAdminDetails.email)) {
        errors.email = "*Enter correct email is required"
    }
    if (!newAdminDetails.password) {
        errors.password = "*Password feild is required"
    }
    else if (newAdminDetails.password.length < 8 || newAdminDetails.password.length > 15) {
        errors.password = "*Password length must be in between 8 to 15"
    }
    else if (!(passwordRegix.test(newAdminDetails.password))) {
        errors.password = "*Atleast 1 lowercase, 1 uppercase and 1 number is reuired."
    }
    if (!newAdminDetails.date.trim()) {
        errors.date = "*Joining Date is required"
    }

    return errors;

}

export default newAdminValidation