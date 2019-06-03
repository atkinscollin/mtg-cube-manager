import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent {
    @ViewChild('globalSidenav', { static: true }) globalSidenav: MatSidenav;

    toggleGlobalSidenav() {
        this.globalSidenav.toggle();
    }
}
