import { Card, Cards } from 'mtgsdk-ts';
import { CardList } from '../models/card-list';
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

@Component({
    selector: 'cube-list',
    templateUrl: './cube-list.component.html',
    styleUrls: ['./cube-list.component.css'],
    providers: [TokenService, AccountService]
})

/**
 * TODO
 * - Create card list component - would be useful to not reuse stuff like delete and selectAll
 * - export list
 * - save/exit, cancel/exit
 * - setup pagination
 */

export class CubeListComponent implements OnInit {

    private CardList: CardList = new CardList();
    private FilterCards: Card[] = new Array<Card>();

    private searchText: string = '';
    private searchResults: Card[] = new Array<Card>();
    private selectedCard: Card;

    private addCardCtrl: FormControl = new FormControl();
    private filteredCards: Observable<any[]>;

    private viewEditMode: boolean = false;

    private sortUtils: SortUtils = new SortUtils();

    private loading: boolean = false;
    private loadingProgress: number = 0;

    constructor(public dialog: MatDialog, private tokenService: TokenService, private accountService: AccountService) { }

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

        ////this.dummyData();

        //this.tokenService.getToken();
        //this.accountService.register();
    }

    // ******** TEMP - FOR TESTING ********
    dummyData() {
        this.loading = true;
        Cards.where({ name: 'elf' })
            .then(results => {
                this.CardList.Cards = results;
                this.loading = false;
            }, err => console.log(err));
    }

    private addCard(card: Card) {
        console.log(card);
        this.CardList.Cards.push(card);
        this.clearSearch();
    }

    private deleteCard(cardToDelete: Card) {
        this.CardList.Cards.splice(this.CardList.Cards.findIndex(card => card == cardToDelete), 1);
    }

    private deleteSelectedCards() {
        this.cardsSelected().forEach(card => {
            this.deleteCard(card);
        });
    }

    private cardsSelected(): Card[] {
        return this.CardList.Cards.filter(card => {
            let cardAny = card as any;
            return cardAny.selected;
        });
    }

    private clearSearch() {
        this.searchResults = new Array<Card>();
        this.searchText = '';
    }

    private displayCard(card: Card): string | Card {
        return card ? card.name : card;
    }

    private openImportDialog() {
        const dialogRef = this.dialog.open(ImportDialog, {
            data: {  }
        });

        dialogRef.afterClosed()
            .subscribe(importedCards => {
                if (importedCards && importedCards.length > 0) {
                    importedCards.forEach(importedCard => {
                        importedCard.selected = false;
                        this.CardList.Cards.push(importedCard);
                    });
                }
            });
    }

    private openFilterDialog() {
        const dialogRef = this.dialog.open(FilterDialog, {
            data: { CardList: this.CardList, FilterCards: this.FilterCards }
        });

        dialogRef.afterClosed()
            .subscribe(filterCards => {
                this.FilterCards = filterCards;
            });
    }

    private openOrderByDialog() {
        const dialogRef = this.dialog.open(OrderByDialog);

        dialogRef.afterClosed()
            .subscribe(choice => {
                if (choice) {
                    console.log(choice);
                }
            });
    }

    private search() {
        this.searchResults = new Array<Card>();

        Cards.where({ name: this.searchText })
            .then(results => {
                this.searchResults = results
                    .filter(card => card.name.toLowerCase().startsWith(this.searchText.toLowerCase()))
                    .sort((a, b) => a.name.length - b.name.length);
            }, err => console.log(err));
    }

}
