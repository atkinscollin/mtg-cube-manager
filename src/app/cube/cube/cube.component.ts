import { Component, OnInit } from '@angular/core';
import { FilterDialog } from '../../card-list-filter-dialog/filter-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { OrderByDialog } from '../../card-list-orderby-dialog/orderby-dialog.component';
import { ImportDialog } from '../../import-dialog/import-dialog.component';
import { Card } from '../../models/card';
import { Cube } from '../../models/cube';
import { ActivatedRoute } from '@angular/router';
import { CubeService } from '../../services/cube.service';
import { CubeCard } from '../../models/cube-card';

@Component({
    selector: 'app-cube',
    templateUrl: './cube.component.html',
    styleUrls: ['./cube.component.css'],
    providers: [CubeService]
})

/**
 * TODO
 * - export list
 * - save/exit, cancel/exit
 * - setup pagination
 */

export class CubeComponent implements OnInit {

    cube: Cube = new Cube();
    filteredCards: Card[] = new Array<Card>();
    viewEditMode = false;

    constructor (public dialog: MatDialog, private activatedRoute: ActivatedRoute, private cubeService: CubeService) { }

    ngOnInit() {
        const cubeId = parseInt(this.activatedRoute.snapshot.paramMap.get('cubeId'), 10);
        this.getCube(cubeId);
        this.addCardTest();
    }

    cardsSelected(): CubeCard[] {
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
    addCardTest() {
        var card: Card = new Card();
        card.CardName = 'testcard';
        card.SetCode = 'tsb';
        var cubeCard = new CubeCard(1, 1);
        cubeCard.Card = card;
        this.cube.CubeCards.push(cubeCard);
    }

    getCube(cubeId: number) {
        this.cubeService.getCubeByCubeId(cubeId)
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

    refreshCubeList() {
        this.getCube(this.cube.CubeId);
    }
}
