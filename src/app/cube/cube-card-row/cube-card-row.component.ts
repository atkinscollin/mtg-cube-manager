import { CardImageDialog } from '../../card-image-dialog/card-image-dialog.component';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CubeCard } from '../../models/cube-card';

@Component({
    selector: 'app-cube-card-row',
    templateUrl: './cube-card-row.component.html',
    styleUrls: ['./cube-card-row.component.css'],
    providers: []
})

export class CubeCardRowComponent {

    @Input() card: CubeCard;
    @Input() viewEditMode = false;
    @Output() deleteCardEvent: EventEmitter<CubeCard> = new EventEmitter();

    constructor (public dialog: MatDialog) { }

    openCardImageDialog() {
        this.dialog.open(CardImageDialog, {
            data: { Card: this.card }
        });
    }
}
