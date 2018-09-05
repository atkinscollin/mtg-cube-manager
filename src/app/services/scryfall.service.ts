import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Card } from '../models/card';
import { ScryfallImageType } from '../enums/scryfall-image-type';

@Injectable()
export class ScryfallService {

    private readonly apiPath: string = 'https://api.scryfall.com/cards/multiverse';
    private readonly apiPathImageDirect: string = 'https://img.scryfall.com/cards/';
    private readonly CARD_LANGUAGE: string = 'en';

    constructor() { }

    getScryfallImageUrl(card: Card, scryfallImageType: ScryfallImageType): string {
        // return card.MultiverseId
        //     ? this.apiPath + "/" + card.MultiverseId + "?format=" + "image" + "&version=" + scryfallImageType
        //     : card.SetCode && card.Number
        //         ? this.apiPathImageDirect + scryfallImageType + "/" + this.CARD_LANGUAGE + "/" + card.SetCode.toLowerCase() + "/" + card.Number.toLowerCase() + ".jpg"
        //         : environment.cardBackUrl;
        return card.ImageUris.Normal;
    }

}
