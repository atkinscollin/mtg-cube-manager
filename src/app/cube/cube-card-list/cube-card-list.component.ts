import { Component, OnInit, Input } from '@angular/core';
import { Card } from '../../models/card';
import { CubeCard } from '../../models/cube-card';
import { MatDialog } from '@angular/material/dialog';
import { FilterDialog } from '../../card-list-filter-dialog/filter-dialog.component';

@Component({
    selector: 'app-cube-card-list',
    templateUrl: './cube-card-list.component.html',
    styleUrls: ['./cube-card-list.component.css']
})
export class CubeCardListComponent implements OnInit {

    @Input() cards: CubeCard[] = new Array<CubeCard>();
    @Input() filteredCards: CubeCard[] = new Array<CubeCard>();
    @Input() viewEditMode = false;

    allSelected = false;

    constructor (public dialog: MatDialog) { }

    ngOnInit() { }

    deleteCard(cardToDelete: CubeCard) {
        this.cards.splice(this.cards.findIndex(card => card === cardToDelete), 1);
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

    resetFilter() {
        this.filteredCards = new Array<CubeCard>();
    }

    selectAllCards() {
        this.cards.forEach(card => {
            let cardAny = card as any;
            cardAny.selected = !this.allSelected;
        });
    }
}
