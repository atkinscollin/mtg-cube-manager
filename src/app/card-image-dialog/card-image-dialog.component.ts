import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Card } from '../models/card';
import { environment } from '../../environments/environment';
import { ScryfallService } from '../services/scryfall.service';
import { ScryfallImageType } from '../enums/scryfall-image-type';

@Component({
    selector: 'card-image-dialog',
    templateUrl: 'card-image-dialog.component.html',
    providers: [ScryfallService]
})

export class CardImageDialog {

    Card: Card;

    constructor(@Inject(MAT_DIALOG_DATA) data: any, private scryFallImageService: ScryfallService) {
        this.Card = data.Card;
    }

    getScryfallImg(): string {
        return this.scryFallImageService.getScryfallImageUrl(this.Card, ScryfallImageType.Normal);
    }

    onFailedToFindImage(event) {
        event.target.src = environment.cardBackUrl;
    }

}
