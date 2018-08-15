import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { environment } from '../../environments/environment';
import { Card } from '../models/card';

@Injectable()
export class CardService {

    private apiPath: string = environment.url + 'api/Card/';
    private readonly CARD_DATA_PATH = './../assets/data/AllCards-x.json';

    constructor(private http: Http) { }

    /**
     * Recursive function that goes through each card in the given array and adds it to the database.
     * @param Cards 
     */
    private addCards(Cards: Card[]) {
        if (Cards.length > 0) {
            let currentCard = this.joinArraysOnObject(Cards.pop());

            // Ignores cards with this criteria
            if (currentCard.types == "Vanguard" || currentCard.types == "Scheme" || currentCard.types == "Plane") {
                return this.addCards(Cards);
            }

            let headers: Headers = new Headers({ 'Content-Type': 'application/json' });
            return this.http.post(this.apiPath + '?Card=' + currentCard, currentCard, { headers: headers })
                .subscribe(() => this.addCards(Cards));
        }
    }

    /**
     * Populates the card database with everything in the json file with the card data.
     * This card data is acquired from https://mtgjson.com/
     * Delete everything from the Cards table manually first.
     */
    populateDatabase() {
        var scope = this;

        this.http.get(scope.CARD_DATA_PATH)
            .map(response => response.json())
            .subscribe(cards => {
                var cardObjects: Card[] = (Object.values(cards) as Card[]);
                scope.addCards(cardObjects);
            }, err => console.log(err));

    }

    /**
     * Joins the arrays on the card object into strings to be stored into the sql database.
     * @param obj 
     */
    private joinArraysOnObject(obj: any): any {
        Object.values(obj).forEach((objValue, index) => {
            if (objValue instanceof Array) {
                obj[Object.keys(obj)[index]] = objValue.join('|');
            }
        });
        return obj;
    }

}
