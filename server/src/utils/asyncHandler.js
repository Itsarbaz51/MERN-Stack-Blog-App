const asyncHandler = (requestHandle) => (req, res, next) => {
    Promise.resolve(requestHandle(req, res, next)).catch((error) => next(error.message))
  };


export { asyncHandler };
