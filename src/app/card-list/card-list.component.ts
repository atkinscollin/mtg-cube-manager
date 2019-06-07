import { Component, OnInit, Input } from '@angular/core';
import { Card } from '../models/card';
import { CubeCard } from '../models/cube-card';
import { MatDialog } from '@angular/material/dialog';
import { FilterDialog } from '../card-list-filter-dialog/filter-dialog.component';

@Component({
    selector: 'app-card-list',
    templateUrl: './card-list.component.html',
    styleUrls: ['./card-list.component.css']
})
export class CardListComponent implements OnInit {

    @Input() cards: CubeCard[] = new Array<CubeCard>();
    @Input() filteredCards: CubeCard[] = new Array<CubeCard>();
    @Input() viewEditMode = false;

    allSelected = false;

    constructor(public dialog: MatDialog) { }

    ngOnInit() { }

    deleteCard(cardToDelete: Card) {
        this.cards.splice(this.cards.findIndex(card => card.Card === cardToDelete), 1);
    }

    openFilterDialog() {
        const dialogRef = this.dialog.open(FilterDialog, {
            data: { Cards: this.cards, FilterCards: this.filteredCards }
        });

        dialogRef.afterClosed()
            .subscribe(filterCards => {
                this.filteredCards = filterCards;
            });
    }

    selectAllCards() {
        this.cards.forEach(card => {
            let cardAny = card as any;
            cardAny.selected = !this.allSelected;
        });
    }
}
