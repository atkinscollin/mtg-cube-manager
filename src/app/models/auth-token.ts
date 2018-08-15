export class AuthToken {
    access_token: string;
    token_type: string;
    userName: string;
    expires_in: number;
    expires: Date;
    issued: Date;

    constructor() { }
} 