import { Pipe, PipeTransform } from '@angular/core';
import { SortUtils } from '../util/sort.util';
import { Card } from '../models/card';

@Pipe({
    name: 'alphabeticalSort',
    pure: false
})

export class AlphabeticalSortPipe implements PipeTransform {
    transform(cards: Card[]): Card[] {
        if (!cards || cards.length <= 1) {
            return cards;
        }
        
        return new SortUtils().alphabetical(cards);
    }
}