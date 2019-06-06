import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Card } from '../models/card';
import { CardService } from '../services/card.service';
import { FormControl } from '@angular/forms';
import { CubeCardService } from '../services/cube-card.service';
import { Cube } from '../models/cube';
import { CubeCard } from '../models/cube-card';
import { finalize } from 'rxjs/operators';
import { SortUtility } from '../util/sort.service';

@Component({
    selector: 'app-add-card',
    templateUrl: './add-card.component.html',
    styleUrls: ['./add-card.component.css'],
    providers: [CardService, CubeCardService]
})

export class AddCardComponent implements OnInit {

    @Input() cube: Cube;
    @Input() viewEditMode = false;
    @Output() addCardEvent: EventEmitter<Card> = new EventEmitter();

    addCardCtrl: FormControl = new FormControl();
    searchText = '';
    searchResults: Card[] = new Array<Card>();
    private searchCardList: Card[] = new Array<Card>();

    constructor (private cardService: CardService, private cubeCardService: CubeCardService, private sortUtility: SortUtility) { }

    ngOnInit() {
        this.populateSearchCardList();

        // Sets up search filter
        this.addCardCtrl.valueChanges
            .subscribe(() => {
                if (this.searchText && this.searchText.length >= 2) {
                    this.search();
                } else {
                    this.searchResults = new Array<Card>();
                }
            });
    }

    addCard(card: Card) {
        const newCubeCard: CubeCard = new CubeCard(this.cube.CubeId, card.CardId);
        this.cubeCardService.createCubeCard(newCubeCard)
            .pipe(finalize(() => this.clearSearch()))
            .subscribe(() => {
                this.addCardEvent.emit(card);
            });
    }

    private clearSearch() {
        this.searchResults = new Array<Card>();
        this.searchText = '';
    }

    displayCard(card: Card): string | Card {
        return card ? card.CardName : card;
    }

    populateSearchCardList() {
        const scope = this;

        if (!this.searchCardList || this.searchCardList.length === 0) {
            this.cardService.getCardSearchInfo()
                .subscribe(cards => scope.searchCardList = cards);
        }
    }

    private search() {
        const scope = this;
        this.searchResults = new Array<Card>();

        if (this.searchText && this.searchCardList && this.searchCardList.length > 0) {
            this.searchResults = this.sortUtility.alphabetical(
                this.searchCardList
                    .filter(card => card.CardName.toLowerCase().startsWith(scope.searchText.toLowerCase())))
                .sort((a, b) => a.Name.length - b.Name.length)
                .slice(0, 10);
        }
    }
}
