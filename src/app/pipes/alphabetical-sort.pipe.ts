import { Pipe, PipeTransform } from '@angular/core';
import { SortUtility } from '../util/sort.service';
import { Card } from '../models/card';

@Pipe({
    name: 'alphabeticalSort',
    pure: false
})

export class AlphabeticalSortPipe implements PipeTransform {

    constructor (private sortUtility: SortUtility) { }


    transform(cards: Card[]): Card[] {
        if (!cards || cards.length <= 1) {
            return cards;
        }

        return this.sortUtility.alphabetical(cards);
    }
}