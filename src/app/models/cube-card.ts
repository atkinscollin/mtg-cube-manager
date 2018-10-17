import { Card } from "./card";
import { Cube } from "./cube";

export class CubeCard// extends Card
{
    CubeCardId: number;
    CubeId: number;
    CardId: string; // TODO - remove
    CustomColorIdentity: string;
    CustomCmc: number;
    IsFoil: boolean;
    IsAltered: boolean;

    Card: Card;
    Cube: Cube;

    constructor(cubeId: number = null, cardId: string = null) { 
        //super();

        this.CubeId = cubeId;
        this.CardId = cardId;
    }
}