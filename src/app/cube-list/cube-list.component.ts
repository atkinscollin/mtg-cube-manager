import { Component, OnInit } from '@angular/core';
import { FilterDialog } from '../card-list-filter-dialog/filter-dialog.component';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { OrderByDialog } from '../card-list-orderby-dialog/orderby-dialog.component';
import { SortUtils } from '../util/sort.util';
import { ImportDialog } from '../import-dialog/import-dialog.component';
import { TokenService } from '../services/token.service';
import { AccountService } from '../services/account.service';
import { Card } from '../models/card';
import { CardService } from '../services/card.service';
import { Cube } from '../models/cube';
import { ActivatedRoute } from '@angular/router';
import { CubeService } from '../services/cube.service';
import { CubeCardService } from '../services/cube-card.service';
import { CubeCard } from '../models/cube-card';

@Component({
    selector: 'cube-list',
    templateUrl: './cube-list.component.html',
    styleUrls: ['./cube-list.component.css'],
    providers: [TokenService, AccountService, CardService, CubeService, CubeCardService]
})

/**
 * TODO
 * - Create card list component - would be useful to not reuse stuff like delete and selectAll
 * - export list
 * - save/exit, cancel/exit
 * - setup pagination
 */

export class CubeListComponent implements OnInit {

    Cube: Cube = new Cube();

    //private Cards: Card[] = new Array<Card>();
    private FilterCards: Card[] = new Array<Card>();

    searchText = '';
    searchResults: Card[] = new Array<Card>();
    selectedCard: Card;
    private searchCardList: Card[] = new Array<Card>();

    addCardCtrl: FormControl = new FormControl();
    filteredCards: Observable<any[]>;

    viewEditMode = false;

    private sortUtils: SortUtils = new SortUtils();

    loadingProgress = 0;

    constructor(public dialog: MatDialog, private cardService: CardService,
        private route: ActivatedRoute, private cubeService: CubeService, private cubeCardService: CubeCardService) { }

    ngOnInit() {
        // Sets up search filter
        this.addCardCtrl.valueChanges
            .subscribe(() => {
                if (this.searchText && this.searchText.length >= 2) {
                    this.search();
                } else {
                    this.searchResults = new Array<Card>();
                }
            });

        const id = parseInt(this.route.snapshot.paramMap.get('id'));

        this.cubeService.getCubeByCubeId(id).then(cube => { this.Cube = cube; console.log(this.Cube.CubeCards); });

        console.log(this.Cube.CubeCards);
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

    addCard(card: Card) {
        console.log(card);

        const newCubeCard: CubeCard = new CubeCard(this.Cube.CubeId, card.CardId);
        this.cubeCardService.createCubeCard(newCubeCard)
            .then(() => {
                this.cubeService.getCubeByCubeId(1).then(cube => this.Cube = cube);
                this.clearSearch();
            })
            .catch(() => {
                this.clearSearch();
            });
    }

    private cardsSelected(): CubeCard[] {
        return this.Cube.CubeCards.filter(card => {
            const cardAny = card as any;
            return cardAny.selected;
        });
    }

    private clearSearch() {
        this.searchResults = new Array<Card>();
        this.searchText = '';
    }

    private deleteCard(cardToDelete: CubeCard) {
        this.Cube.CubeCards.splice(this.Cube.CubeCards.findIndex(card => card == cardToDelete), 1);
    }

    deleteSelectedCards() {
        this.cardsSelected().forEach(card => {
            this.deleteCard(card);
        });
    }

    displayCard(card: Card): string | Card {
        return card ? card.CardName : card;
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
                        this.Cube.CubeCards.push(importedCard);
                    });
                }
            });
    }

    openFilterDialog() {
        const dialogRef = this.dialog.open(FilterDialog, {
            data: { Cards: this.Cube.CubeCards, FilterCards: this.FilterCards }
        });

        dialogRef.afterClosed()
            .subscribe(filterCards => {
                this.FilterCards = filterCards;
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

    private search() {
        const scope = this;
        this.searchResults = new Array<Card>();

        if (this.searchText && this.searchCardList && this.searchCardList.length > 0) {
            this.searchResults = this.sortUtils.alphabetical(
                this.searchCardList
                    .filter(card => card.CardName.toLowerCase().startsWith(scope.searchText.toLowerCase())))
                .sort((a, b) => a.Name.length - b.Name.length)
                .slice(0, 10);
        }
    }

    populateSearchCardList() {
        const scope = this;

        if (!this.searchCardList || this.searchCardList.length === 0) {
            this.cardService.getCards()
                .then(cards => {
                    scope.searchCardList = cards;
                })
                .catch();
        }
    }
}
