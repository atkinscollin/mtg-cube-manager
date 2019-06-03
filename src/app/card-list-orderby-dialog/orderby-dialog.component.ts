import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'orderby-dialog',
    templateUrl: 'orderby-dialog.component.html',
})

/**
 * TODO
 * - 
 */

export class OrderByDialog {

    private orderby: string = 'name';

    constructor(public dialogRef: MatDialogRef<OrderByDialog>) { }
}
