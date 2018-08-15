import { Card } from "mtgsdk-ts";

export class CardUtils {
    constructor() { }

    getCmc(card: Card) {
        if (card.cmc >= 25) {
            return 50;
        } else if (this.isXSpell(card)) {
            return 20 + card.cmc;
        } else {
            return card.cmc;
        }
    }

    isXSpell(card: Card) {
        return card.manaCost && card.manaCost.includes('X');
    }
}