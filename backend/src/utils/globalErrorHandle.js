import ApiResponse from "./apiResponse.js"
const globalErrorHandler = (err, req, res, next) => {
    console.log(err)
    const status = err.statusCode || 500
    const message = err.message || "Something went wrong"
    const success = false
    return res.status(status)
        .json(new ApiResponse(status, message , ""))
}

export default globalErrorHandler