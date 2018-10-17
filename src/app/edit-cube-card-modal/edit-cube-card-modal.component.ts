import { Component, OnInit } from '@angular/core';
import { CubeCard } from '../models/cube-card';

@Component({
    selector: 'app-edit-cube-card-modal',
    templateUrl: './edit-cube-card-modal.component.html',
    styleUrls: ['./edit-cube-card-modal.component.css']
})
export class EditCubeCardDialog implements OnInit {

    CubeCard: CubeCard = new CubeCard();

    constructor() { }

    ngOnInit() { }

}
