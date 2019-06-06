import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Cube } from '../models/cube';

@Component({
    selector: 'app-create-cube-dialog',
    templateUrl: 'create-cube-dialog.component.html',
})

export class CreateCubeDialogComponent {

    Cube: Cube = new Cube();

    constructor(public dialogRef: MatDialogRef<CreateCubeDialogComponent>, @Inject(MAT_DIALOG_DATA) data: any) { }

    createAndClose() {
        this.closeDialog(this.Cube);
    }

    close() {
        this.closeDialog();
    }

    private closeDialog(cube: Cube = null) {
        this.dialogRef.close(cube);
    }

}
