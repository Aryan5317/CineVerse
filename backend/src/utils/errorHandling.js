class ApiError extends Error {
    constructor(statusCode, message, error = [], stack = "") {
        const finalMessage = message || (error && error.message) || "Something went wrong"
        super(finalMessage)
        this.statusCode = statusCode,
            this.message = finalMessage,
            this.error = error,
            this.success = false,
            this.data = null
        if (stack) {
            this.stack = stack
        }
        else {
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export default ApiError