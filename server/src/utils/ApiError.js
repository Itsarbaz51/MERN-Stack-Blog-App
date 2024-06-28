class ApiError extends Error {
    constructor(
        statusCode,
        message = "Something went worng.",
        stack = '',
        error = []
    )
    {
        super(message)
        this.statusCode = statusCode
        this.message = message
        this.error = error
        this.data = this.data
        this.success = false

        if(stack){
            this.stack = stack
        } else {
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export {
    ApiError
}