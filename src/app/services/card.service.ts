
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Card } from '../models/card';

@Injectable()
export class CardService {

    private apiPath: string = environment.url + 'api/cards/';

    constructor(private http: HttpClient) { }

    getCards() {
        return this.http.get<Card[]>(this.apiPath).toPromise()
            .then((cards: Card[]) => {
                return cards;
            })
            .catch(err => {
                console.log('Error retrieving all cards.', err);
                return new Array<Card>();
            });
    }

    // async getCards() {
    //     try {
    //         const cards = await this.http.get<Card[]>(this.apiPath).toPromise();
    //         return cards;
    //     }
    //     catch (err) {
    //         console.log('Error retrieving all cards.', err);
    //         return new Array<Card>();
    //     }
    // }

    // TODO - add this to the C# side.
    /**
     * Filters out junk we don't want in the database
     * @param cards
     */
    // private filterOutUneededCards(cards: Card[]): Card[] {
    //     return cards.filter(card => !(card.TypeLine.includes('Vanguard') || card.TypeLine.includes('Scheme')
    //         || (card.TypeLine.includes('Plane') && !card.TypeLine.includes('Planeswalker'))));
    // }
}
