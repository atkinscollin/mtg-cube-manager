import { Cube } from "./cube";

export class User {
    Id: number;
    Email: string;
    Password: string;
    ConfirmPassword: string;

    UserName: string;

    CubesCreated: Cube[];

    constructor() { }
}