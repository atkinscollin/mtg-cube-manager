import { BaseObject } from "./base-object";

export class User implements BaseObject {
    Id: number;
    Email: string;
    Password: string;
    ConfirmPassword: string;

    constructor() { }
}