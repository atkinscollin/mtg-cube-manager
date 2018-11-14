import { Component, OnInit } from '@angular/core';
import { FilterDialog } from '../card-list-filter-dialog/filter-dialog.component';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { OrderByDialog } from '../card-list-orderby-dialog/orderby-dialog.component';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import { SortUtils } from '../util/sort.util';
import { ImportDialog } from '../import-dialog/import-dialog.component';
import { TokenService } from '../services/token.service';
import { AccountService } from '../services/account.service';
import { Card } from '../models/card';
import { CardService } from '../services/card.service';
import { environment } from '../../environments/environment';
import { CurveSortPipe } from '../pipes/curve-sort.pipe';
import { Cube } from '../models/cube';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
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

    private searchText: string = '';
    searchResults: Card[] = new Array<Card>();
    selectedCard: Card;
    private searchCardList: Card[] = new Array<Card>();

    private addCardCtrl: FormControl = new FormControl();
    filteredCards: Observable<any[]>;

    viewEditMode: boolean = false;

    private sortUtils: SortUtils = new SortUtils();

    private loading: boolean = false;
    loadingProgress: number = 0;

    constructor(public dialog: MatDialog, private tokenService: TokenService, private accountService: AccountService, private cardService: CardService,
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

        let id = parseInt(this.route.snapshot.paramMap.get('id'));

        this.cubeService.getCubeByCubeId(id).then(cube => {this.Cube = cube; console.log(this.Cube.CubeCards); });

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
        this.loading = true;

        var newCubeCard: CubeCard = new CubeCard(this.Cube.CubeId, card.Id);
        //this.Cards.push(card);
        this.cubeCardService.createCubeCard(newCubeCard)
            .then(() => {
                //this.Cards.push(card);
                this.cubeService.getCubeByCubeId(1).then(cube => this.Cube = cube);
                this.clearSearch();
                this.loading = false;
            })
            .catch(() => {
                this.clearSearch();
                this.loading = false
            });        
    }

    private cardsSelected(): CubeCard[] {
        return this.Cube.CubeCards.filter(card => {
            let cardAny = card as any;
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
        return card ? card.Name : card;
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
        var scope = this;
        this.searchResults = new Array<Card>();

        if (this.searchText && this.searchCardList && this.searchCardList.length > 0) {
            this.searchResults = this.sortUtils.alphabetical(
                this.searchCardList
                    .filter(card => card.Name.toLowerCase().startsWith(scope.searchText.toLowerCase())))
                .sort((a, b) => a.Name.length - b.Name.length)
                .slice(0, 10);
        }
    }

    populateSearchCardList() {
        var scope = this;

        if (!this.searchCardList || this.searchCardList.length == 0) {
            this.cardService.getCards()
                .then(cards => {
                    scope.searchCardList = cards;
                })
                .catch();
        }
    }
}
