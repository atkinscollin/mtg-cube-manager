import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { isNullOrUndefined } from 'util';
import { environment } from '../../environments/environment';
import { Card } from '../models/card';
import { JsonCard } from '../models/json-card';
import { ImageUris } from '../models/image-uris';
import { RelatedUris } from '../models/related-uris';

@Injectable()
export class CardService {

    private apiPath: string = environment.url + 'api/Card/';
    // TODO - Change to pull json from their api
    private readonly CARD_DATA_PATH = './../assets/data/scryfall-default-cards.json';

    constructor(private http: Http, private httpClient: HttpClient) { }

    getCards() {
        return this.httpClient.get<Card[]>(this.apiPath)
            .map(cards => this.deflattenObjects(cards))
            .toPromise()
            .then((cards: Card[]) => {
                return cards;
            })
            .catch(err => {
                console.log("Error retrieving all cards.", err);
                return new Array<Card>();
            });
    }

    /**
     * Populates the card database with everything in the json file with the card data.
     * The card data is acquired from https://scryfall.com/docs/api/bulk-data
     */
    populateDatabase() {
        var scope = this;

        this.http.get(scope.CARD_DATA_PATH)
            .map(response => response.json())
            .subscribe(jsonCards => {
                var mappedCards = (Object.values(jsonCards) as JsonCard[]);
                var allCards: Card[] = new Array<Card>();
                mappedCards.forEach(mappedCard => {
                    if (!mappedCard.digital)
                    {
                        allCards.push(new Card().convertFromJsonCard(mappedCard));
                    }
                });
                
                var filteredCards = this.filterOutUneededCards(allCards);

                scope.addCards(filteredCards);
            }, err => console.log(err));
    }

    /**
     * Recursive function that goes through each card in the given array and adds it to the database.
     * @param cards 
     */
    private addCards(cards: Card[]) {
        if (cards.length > 0) {
            let currentCard = this.flattenObjectForDatabaseStorage(cards.pop());

            // TODO - Add handler if a card fails to be added, probably just log it, maybe output it to a json
            let headers: Headers = new Headers({ 'Content-Type': 'application/json' });
            return this.http.post(this.apiPath + '?Card=' + currentCard, currentCard, { headers })
                .subscribe(() => this.addCards(cards));
        }
    }

    /**
     * Deflattens the objects retrieved from the database to their expanded form as arrays and objects instead of strings
     * @param objs 
     */
    private deflattenObjects(objs: any[]): any[] {
        objs.forEach((obj, index) => {
            Object.values(obj).forEach((objValue, indexValue) => {
                if (typeof objValue === "string" && objValue.includes('|')) {
                    objs[index][Object.keys(obj)[indexValue]] = objValue.split('|');
                }
            });

            objs[index].ImageUris = new ImageUris();
            objs[index].ImageUris.Png = obj.ImageUriPng;
            objs[index].ImageUris.BorderCrop = obj.ImageUriBorderCrop;
            objs[index].ImageUris.ArtCrop = obj.ImageUriArtCrop;
            objs[index].ImageUris.Large = obj.ImageUriLarge;
            objs[index].ImageUris.Normal = obj.ImageUriNormal;
            objs[index].ImageUris.Small = obj.ImageUriSmall;

            objs[index].RelatedUris = new RelatedUris();
            objs[index].RelatedUris.TcgplayerDecks = obj.RelatedUriTcgplayerDecks;
            objs[index].RelatedUris.Edhrec = obj.RelatedUriEdhrec;
            objs[index].RelatedUris.Mtgtop8 = obj.RelatedUriMtgtop8;
        });

        return objs;
    }

    /**
     * Filters out junk we don't want in the database
     * @param cards 
     */
    private filterOutUneededCards(cards: Card[]): Card[] {
        return cards.filter(card => !(card.TypeLine.includes("Vanguard") || card.TypeLine.includes("Scheme") 
            || (card.TypeLine.includes("Plane") && !card.TypeLine.includes("Planeswalker"))));
    }

    /**
     * Joins the arrays on the card object into strings to be stored into the sql database.
     * @param obj 
     */
    private flattenObjectForDatabaseStorage(obj: any): any {
        Object.values(obj).forEach((objValue, index) => {
            if (objValue instanceof Array) {
                obj[Object.keys(obj)[index]] = objValue.join('|');
            }
        });

        obj.ImageUriPng = obj.ImageUris.Png;
        obj.ImageUriBorderCrop = obj.ImageUris.BorderCrop;
        obj.ImageUriArtCrop = obj.ImageUris.ArtCrop;
        obj.ImageUriLarge = obj.ImageUris.Large;
        obj.ImageUriNormal = obj.ImageUris.Normal;
        obj.ImageUriSmall = obj.ImageUris.Small;

        obj.RelatedUriTcgplayerDecks = obj.RelatedUris.TcgplayerDecks;
        obj.RelatedUriEdhrec = obj.RelatedUris.Edhrec;
        obj.RelatedUriMtgtop8 = obj.RelatedUris.Mtgtop8;

        return obj;
    }

}
