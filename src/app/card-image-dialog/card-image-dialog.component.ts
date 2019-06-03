import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Card } from '../models/card';
import { environment } from '../../environments/environment';

@Component({
    selector: 'card-image-dialog',
    templateUrl: 'card-image-dialog.component.html',
    providers: []
})

export class CardImageDialog {
    Card: Card;

    constructor(@Inject(MAT_DIALOG_DATA) data: any) {
        this.Card = data.Card;
    }

    onFailedToFindImage(event) {
        event.target.src = environment.cardBackUrl;
    }

}
