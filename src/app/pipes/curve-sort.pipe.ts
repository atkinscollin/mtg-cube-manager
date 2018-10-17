import { Pipe, PipeTransform } from '@angular/core';
import { Color } from '../models/color';
import { CardUtils } from '../util/card.util';
import { Card } from '../models/card';

@Pipe({
    name: 'curveSort',
    pure: false
})

/**
 * TODO 
 * - dynamic ordering
 * - check more cases
 * - set
 * - color identity, for colorless like lands
 * - rarity
 * - price
 */

export class CurveSortPipe implements PipeTransform {

    private cardUtils: CardUtils = new CardUtils();

    transform(cards: Card[]): Card[] {
        if (!cards || cards.length <= 1) {
            return cards;
        }

        return cards.sort((a, b) => ((this.getColorStrength(b) - this.getColorStrength(a)) * 10000) - (this.cardUtils.getCmc(b) - this.cardUtils.getCmc(a)) * 100 - (this.getAlphabeticalWinner(a, b)));
    }

    private getAlphabeticalWinner(a: Card, b: Card) {
        var nameA = a.Name.toLowerCase(), nameB = b.Name.toLowerCase();
        if (nameA < nameB) {
            return 1;
        }
        else if (nameA > nameB) {
            return -1;
        }
        return 0;
    }

    private getColorStrength(card: Card) {
        if (!card.Colors) {
            if (card.TypeLine && card.TypeLine.includes('Land')) {
                return 1;
            } else if (card.TypeLine && card.TypeLine.includes('Artifact')) {
                return 2;
            } else {
                return 3;
            }
        } else if (card.Colors.length >= 2) {
            return 4;
        } else if (card.Colors.includes('G')) {
            return 5;
        } else if (card.Colors.includes('R')) {
            return 6;
        } else if (card.Colors.includes('B')) {
            return 7;
        } else if (card.Colors.includes('U')) {
            return 8;
        } else if (card.Colors.includes('W')) {
            return 9;
        } else {
            return 0;
        }
    }
}