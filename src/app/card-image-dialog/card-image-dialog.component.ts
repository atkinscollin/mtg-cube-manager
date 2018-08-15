import * as Magic from 'mtgsdk-ts';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'card-image-dialog',
    templateUrl: 'card-image-dialog.component.html',
})

export class CardImageDialog {

    private Card: Magic.Card;

    constructor(@Inject(MAT_DIALOG_DATA) data: any) {
        this.Card = data.Card;
    }

}
