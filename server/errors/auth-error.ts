class AuthError implements Error {
    name: string;
    message: string;
    status: number;
    stack: string;

    constructor(message: string) {
        this.name = 'AuthError';
        this.message = message;
        this.status = 401;
    }
}

export = AuthError;