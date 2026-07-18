import validator from "validator"
function adminUpdateDetails(adminValue) {
    
    console.log("Admin Value for update is: ", adminValue)

    const error = {}

    if(!validator.isMobilePhone(adminValue.mobileNumber.trim(), "en-IN")){
        error.mobileNumber = "*Enter correct Mobile Number"
    }

    return error


}

export default adminUpdateDetails