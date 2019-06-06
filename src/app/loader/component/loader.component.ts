import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../service/loader.service';

@Component({
    selector: 'app-loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {
    loading: boolean;

    constructor(private loaderService: LoaderService) {
        this.loaderService.isLoading.subscribe((isLoading: boolean) => {
            this.loading = isLoading;
        });
    }

    ngOnInit() { }

}
