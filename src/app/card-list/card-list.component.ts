import { Component, OnInit, Input } from '@angular/core';
import { Card } from '../models/card';

@Component({
    selector: 'card-list',
    templateUrl: './card-list.component.html',
    styleUrls: ['./card-list.component.css']
})
export class CardListComponent implements OnInit {

    @Input() Cards: Card[] = new Array<Card>();
    @Input() FilterCards: Card[] = new Array<Card>();
    @Input() viewEditMode: boolean = false;

    private selectAll: boolean = false;

    constructor() { }

    ngOnInit() { }

    clickSelectAll() {
        this.Cards.forEach(card => {
            let cardAny = card as any;
            cardAny.selected = !this.selectAll;
        });
    }

    deleteCard(cardToDelete: Card) {console.log(cardToDelete);
        this.Cards.splice(this.Cards.findIndex(card => card == cardToDelete), 1);
    }

}
