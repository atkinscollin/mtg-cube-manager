import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl } from '@angular/forms';

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
    private orderbyTypes: string[] = ['name', 'curve'];

    constructor(public dialogRef: MatDialogRef<OrderByDialog>) { }

    private saveAndCloseDialog() {
        this.dialogRef.close(this.orderby)
    }

    private closeDialog() {
        this.dialogRef.close();
    }

}
