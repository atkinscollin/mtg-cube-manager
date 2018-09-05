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

@Component({
    selector: 'cube-list',
    templateUrl: './cube-list.component.html',
    styleUrls: ['./cube-list.component.css'],
    providers: [TokenService, AccountService, CardService]
})

/**
 * TODO
 * - Create card list component - would be useful to not reuse stuff like delete and selectAll
 * - export list
 * - save/exit, cancel/exit
 * - setup pagination
 */

export class CubeListComponent implements OnInit {

    private Cards: Card[] = new Array<Card>();
    private FilterCards: Card[] = new Array<Card>();

    private searchText: string = '';
    private searchResults: Card[] = new Array<Card>();
    private selectedCard: Card;
    private searchCardList: Card[] = new Array<Card>();

    private addCardCtrl: FormControl = new FormControl();
    private filteredCards: Observable<any[]>;

    private viewEditMode: boolean = false;

    private sortUtils: SortUtils = new SortUtils();

    private loading: boolean = false;
    private loadingProgress: number = 0;

    constructor(public dialog: MatDialog, private tokenService: TokenService, private accountService: AccountService, private cardService: CardService) { }

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

        this.dummyData();
    }

    // ******** TEMP - FOR TESTING ********
    dummyData() {
        var scope = this;
        this.loading = true;

        if (this.searchCardList === undefined || this.searchCardList.length == 0) {
            this.cardService.getCards()
                .then(cards => {
                    scope.searchCardList = cards;
                    this.Cards = scope.searchCardList.filter(card => card.Name.toLowerCase().includes('elf'));
                    this.loading = false;
                })
                .catch(() => this.loading = false);
        }
    }

    addCard(card: Card) {
        console.log(card);
        this.Cards.push(card);
        this.clearSearch();
    }

    private cardsSelected(): Card[] {
        return this.Cards.filter(card => {
            let cardAny = card as any;
            return cardAny.selected;
        });
    }

    private clearSearch() {
        this.searchResults = new Array<Card>();
        this.searchText = '';
    }

    private deleteCard(cardToDelete: Card) {
        this.Cards.splice(this.Cards.findIndex(card => card == cardToDelete), 1);
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
                        this.Cards.push(importedCard);
                    });
                }
            });
    }

    openFilterDialog() {
        const dialogRef = this.dialog.open(FilterDialog, {
            data: { Cards: this.Cards, FilterCards: this.FilterCards }
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
