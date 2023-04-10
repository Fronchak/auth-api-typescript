import ApiError from "./api-error";

class UnauthorizedEror extends ApiError {
    constructor() {
        super('Unauthorized error', 'You must be logged in to access this content', 401);
    }
}

export default UnauthorizedEror;