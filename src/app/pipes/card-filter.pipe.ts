import { Pipe, PipeTransform } from '@angular/core';
import { Card } from '../models/card';

@Pipe({
    name: 'cardFilter',
    pure: false
})

export class CardFilterPipe implements PipeTransform {
    transform(cards: Card[], filter: Card[]): Card[] {
        if (!cards || !filter) {
            return cards;
        }
        
        return cards.filter(card => !filter.some(filterCard => filterCard == card));
    }
}