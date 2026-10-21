function addNewScreen(screenData) {

    console.log("Screen data are: ", screenData);

    const errors = {};

    if (screenData.screenNumber === undefined ||
        screenData.screenNumber === null ||
        screenData.screenNumber === ""
    ) {
        errors.screenNumber = "*Screen Number is required";
    }
    else if (Number(screenData.screenNumber) < 1 ||
        Number(screenData.screenNumber) > 30
    ) {
        errors.screenNumber = "*Invalid screen number. Enter a screen number between 1 and 30";
    }

    if (!screenData.screenName || screenData.screenName === "") {
        errors.screenName = "*Screen Name is required";
    }


    if (!screenData.screenStatus?.trim()) {
        errors.screenStatus = "*Screen Status is required";
    }


    if (!screenData.screenFormat?.trim()) {
        errors.screenFormat = "*Screen Format is required";
    }


    if (!Array.isArray(screenData.seatCategories) ||
        screenData.seatCategories.length === 0
    ) {
        errors.seatCategories = "*At least one seat category is required";
    }
    else {

        const seatCategoryErrors = [];

        for (let i = 0; i < screenData.seatCategories.length; i++) {

            const category = screenData.seatCategories[i];

            console.log("Seat category is: ", category);

            const categoryError = {};

            if (!category.seatType?.trim()) {
                categoryError.seatType = "*Seat Type is required";
            }

            if (
                category.rows === undefined ||
                category.rows === null ||
                category.rows === ""
            ) {
                categoryError.rows = "*Rows are required";
            }
            else if (Number(category.rows) < 1) {
                categoryError.rows = "*Rows must be at least 1";
            }

            if (
                category.columns === undefined ||
                category.columns === null ||
                category.columns === ""
            ) {
                categoryError.columns = "*Columns are required";
            }
            else if (Number(category.columns) < 1) {
                categoryError.columns = "*Columns must be at least 1";
            }

            seatCategoryErrors.push(categoryError);
        }
        const hasSeatCategoryErrors = seatCategoryErrors.some(
            (categoryError) => Object.keys(categoryError).length > 0
        );

        if (hasSeatCategoryErrors) {
            errors.seatCategories = seatCategoryErrors;
        }
    }


    return errors;
}

export default addNewScreen;