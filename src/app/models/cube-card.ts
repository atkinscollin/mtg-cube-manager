import { Card } from "./card";
import { Cube } from "./cube";

export class CubeCard
{
    CubeCardId: number;
    CubeId: number;
    CardId: string;
    CustomColorIdentity: string;
    CustomCmc: number;
    IsFoil: boolean;
    IsAltered: boolean;

    Card: Card;
    Cube: Cube;

    constructor(cubeId: number = null, cardId: string = null) { 
        this.CubeId = cubeId;
        this.CardId = cardId;
        this.IsFoil = false;
        this.IsAltered = false;

        this.Cube = new Cube();
        this.Card = new Card();
    }
}