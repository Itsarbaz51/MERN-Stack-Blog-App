class ApiError extends Error {
    constructor(
        statuscode,
        message = 'something went worng',
        stack = "",
        error= []
    ){
        super(message)
        this.statuscode = statuscode
        this.message = message
        this.error = error
        this.data = this.data
        this.success = false


        if (stack) {
            this.stack = stack
        } else {
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export {
    ApiError
}