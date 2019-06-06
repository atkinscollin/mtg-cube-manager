import { Component, OnInit } from '@angular/core';
import { FilterDialog } from '../card-list-filter-dialog/filter-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { OrderByDialog } from '../card-list-orderby-dialog/orderby-dialog.component';
import { ImportDialog } from '../import-dialog/import-dialog.component';
import { Card } from '../models/card';
import { Cube } from '../models/cube';
import { ActivatedRoute } from '@angular/router';
import { CubeService } from '../services/cube.service';
import { CubeCard } from '../models/cube-card';

@Component({
    selector: 'cube-list',
    templateUrl: './cube-list.component.html',
    styleUrls: ['./cube-list.component.css'],
    providers: [CubeService]
})

/**
 * TODO
 * - export list
 * - save/exit, cancel/exit
 * - setup pagination
 */

export class CubeListComponent implements OnInit {

    cube: Cube = new Cube();
    filteredCards: Card[] = new Array<Card>();
    viewEditMode = false;

    constructor (public dialog: MatDialog, private route: ActivatedRoute,
        private cubeService: CubeService, ) { }

    ngOnInit() {
        this.getCube();
        //this.dummyData();
    }

    // ******** TEMP - FOR TESTING ********
    // dummyData() {
    //     var scope = this;
    //     this.loading = true;

    //     if (this.searchCardList === undefined || this.searchCardList.length == 0) {
    //         this.cardService.getCards()
    //             .then(cards => {
    //                 scope.searchCardList = cards;
    //                 this.Cards = scope.searchCardList.filter(card => card.Name.toLowerCase().includes('elf'));
    //                 this.loading = false;
    //             })
    //             .catch(() => this.loading = false);
    //     }
    // }

    private cardsSelected(): CubeCard[] {
        return this.cube.CubeCards.filter(card => {
            const cardAny = card as any;
            return cardAny.selected;
        });
    }

    private deleteCard(cardToDelete: CubeCard) {
        this.cube.CubeCards.splice(this.cube.CubeCards.findIndex(card => card === cardToDelete), 1);
    }

    deleteSelectedCards() {
        this.cardsSelected().forEach(card => {
            this.deleteCard(card);
        });
    }

    getCube() {
        const id = parseInt(this.route.snapshot.paramMap.get('id'), 10);
        this.cubeService.getCubeByCubeId(id)
            .subscribe(cube => this.cube = cube);
    }

    openImportDialog() {
        const dialogRef = this.dialog.open(ImportDialog, {
            data: {}
        });

        dialogRef.afterClosed()
            .subscribe(importedCards => {
                if (importedCards && importedCards.length > 0) {
                    importedCards.forEach(importedCard => {
                        importedCard.selected = false;
                        this.cube.CubeCards.push(importedCard);
                    });
                }
            });
    }

    openFilterDialog() {
        const dialogRef = this.dialog.open(FilterDialog, {
            data: { Cards: this.cube.CubeCards, FilterCards: this.filteredCards }
        });

        dialogRef.afterClosed()
            .subscribe(filterCards => {
                this.filteredCards = filterCards;
            });
    }

    openOrderByDialog() {
        const dialogRef = this.dialog.open(OrderByDialog);

        dialogRef.afterClosed()
            .subscribe(choice => {
                if (choice) {
                    console.log(choice);
                    // TODO
                }
            });
    }
}
