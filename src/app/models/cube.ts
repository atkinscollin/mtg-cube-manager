import { User } from "./user";
import { CubeCard } from "./cube-card";

export class Cube {
    CubeId: number;
    CubeName: string;
    CreatedById: string;
    CreatedDate: Date;
    UpdatedDate: Date;

    CubeCards: CubeCard[];

    constructor() { 
        this.CubeCards = new Array<CubeCard>();
    }
}