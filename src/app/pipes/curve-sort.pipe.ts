import { Pipe, PipeTransform } from '@angular/core';
import { Card } from 'mtgsdk-ts';
import { Color } from '../models/color';
import { CardUtils } from '../util/card.util';

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
        var nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();
        if (nameA < nameB) {
            return 1;
        }
        else if (nameA > nameB) {
            return -1;
        }
        return 0;
    }

    private getColorStrength(card: Card) {
        if (!card.colors) {
            if (card.type && card.types.some(type => type == 'Land')) {
                return 1;
            } else if (card.type && card.types.some(type => type == 'Artifact')) {
                return 2;
            } else {
                return 3;
            }
        } else if (card.colors.length >= 2) {
            return 4;
        } else if (card.colors.some(color => color.toString().toLowerCase() == 'green')) {
            return 5;
        } else if (card.colors.some(color => color.toString().toLowerCase() == 'red')) {
            return 6;
        } else if (card.colors.some(color => color.toString().toLowerCase() == 'black')) {
            return 7;
        } else if (card.colors.some(color => color.toString().toLowerCase() == 'blue')) {
            return 8;
        } else if (card.colors.some(color => color.toString().toLowerCase() == 'white')) {
            return 9;
        } else {
            return 0;
        }
    }
}