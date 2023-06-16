exports.status = {
    success: 200,
    successCreated: 201,
    accepted: 202,
    successNoRecords: 204,
    badRequest: 400, // if parameter missing
    unauthenticated: 401, // if token is invalid
    unauthorized: 403, // if token is invalid
    conflict: 409, // when user already exist.
    unsupportedMediaType: 422,
    sessionExpired: 440, // if the token is expired
    internalServerError: 500,
    notfound: 404,
    gone: 410,
    notAllow: 405,
    found: 405
};

exports.message = {
    tokenMissing: "TOKEN MISSING",
    badRequest: "Bad Request payload",
    alreadyExist: " Already Exist.",
    notFound: " Not Found.",
    notMatchPassword: "Password Not Match.",
    tryAnotherPassword: "This password was previously set. Please choose a new one.",
    tokenGenerateSuccess: "Token has been generated Successfully.",
    updateSuccess: "Updated Successfully.",
    RemovedSuccess: "Removed Successfully.",
    unauthorized: "Unauthorized User.",
    successCreated: "Created Successfully.",
    successFetched: "Fetched Successfully.",
    succeedLogin: "Login Success.",
    invalidCredentials: "invalidCredentials.",
}
