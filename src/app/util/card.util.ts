import { Card } from "../models/card";

export class CardUtils {
    constructor() { }

    getCmc(card: Card) {
        if (card.Cmc >= 25) {
            return 50;
        } else if (this.isXSpell(card)) {
            return 20 + card.Cmc;
        } else {
            return card.Cmc;
        }
    }

    isXSpell(card: Card) {
        return card.ManaCost && card.ManaCost.includes('X');
    }
}