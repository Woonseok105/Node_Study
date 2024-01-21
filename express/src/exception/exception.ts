export class CustomException extends Error {
    public statusCode: number;
    public message: string;

    constructor(statusCode: number, message: string) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
    }
}

export class UnauthorizedException extends CustomException {
    constructor(message: string) {
        super(401, message);
    }
}

export class NotFoundException extends CustomException {
    constructor(message: string) {
        super(404, message);
    }
}

export class ConflictException extends CustomException {
    constructor(message: string) {
        super(409, message);
    }
}