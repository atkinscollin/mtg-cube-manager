import { CardImageDialog } from '../card-image-dialog/card-image-dialog.component';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Card } from '../models/card';
import { environment } from '../../environments/environment';

@Component({
    selector: 'card-row',
    templateUrl: './card-row.component.html',
    styleUrls: ['./card-row.component.css'],
    providers: []
})

export class CardRowComponent {

    @Input() Card: Card;
    @Input() viewEditMode: boolean = false;
    @Output() deleteCardEvent: EventEmitter<Card> = new EventEmitter();

    constructor(public dialog: MatDialog) { }

    openCardImageDialog() {
        this.dialog.open(CardImageDialog, {
            data: { Card: this.Card }
        });
    }

    // onFailedToFindImage(event) {
    //     event.target.src = environment.cardBackUrl;
    // }

}
