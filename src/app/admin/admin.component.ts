import { Component, OnInit } from '@angular/core';
import { CardService } from '../services/card.service';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css'],
    providers: [CardService]
})
export class AdminComponent implements OnInit {

    constructor(private cardService: CardService) { }

    // TODO - Add check for correct rights on init
    ngOnInit() { }

    private populateDatabase() {
        this.cardService.populateDatabase();
    }

}
