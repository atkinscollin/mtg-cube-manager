import * as Magic from 'mtgsdk-ts';
import { BaseObject } from './base-object';

export class CardList implements BaseObject {
    Id: number;
    Title: string;
    Cards: Magic.Card[];

    constructor(title: string = null) {
        this.Id = -1;
        this.Title = title;
        this.Cards = new Array<Magic.Card>();
    }
} 