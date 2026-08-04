function registerComponent5Validation(checkBoxValue) {

    console.log("CheckBox Value are: ", checkBoxValue)

    const errors = {}

    if (!checkBoxValue.confirmationCheckbox) {
        errors.confirmationCheckbox = "*Please confirm that the information provided is accurate."
    }

    if (!checkBoxValue.termsCheckbox) {
        errors.termsCheckbox = "*Please accept the Terms & Conditions."
    }

    if (!checkBoxValue.privacyCheckbox) {
        errors.privacyCheckbox = "*Please accept the Privacy Policy."
    }

    return errors
}

export default registerComponent5Validation