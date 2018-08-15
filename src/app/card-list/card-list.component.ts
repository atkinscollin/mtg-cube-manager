import { Component, OnInit, Input } from '@angular/core';
import { Card } from 'mtgsdk-ts';

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

    private clickSelectAll() {
        this.Cards.forEach(card => {
            let cardAny = card as any;
            cardAny.selected = !this.selectAll;
        });
    }

    private deleteCard(cardToDelete: Card) {console.log(cardToDelete);
        this.Cards.splice(this.Cards.findIndex(card => card == cardToDelete), 1);
    }

}