import { CardImageDialog } from '../card-image-dialog/card-image-dialog.component';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Card } from 'mtgsdk-ts';

@Component({
    selector: 'card-row',
    templateUrl: './card-row.component.html',
    styleUrls: ['./card-row.component.css']
})

export class CardRowComponent {

    @Input() Card;
    @Input() viewEditMode: boolean = false;
    @Output() deleteCardEvent: EventEmitter<Card> = new EventEmitter();

    constructor(public dialog: MatDialog) { }

    private openCardImageDialog() {
        const dialogRef = this.dialog.open(CardImageDialog, {
            data: { Card: this.Card }
        });
    }

}
