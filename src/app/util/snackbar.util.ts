import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';

@Injectable()
export class SnackBarUtil {

    constructor(private snackbar: MatSnackBar) { }

    open(message: string) {
        const config: MatSnackBarConfig = new MatSnackBarConfig();
        config.duration = 3000;
        this.snackbar.open(message, 'dismiss', config);
    }
}
