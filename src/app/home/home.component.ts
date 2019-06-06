import { Component, OnInit } from '@angular/core';
import { CubeService } from '../services/cube.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateCubeDialogComponent } from '../create-cube-dialog/create-cube-dialog.component';
import { Cube } from '../models/cube';
import { SnackBarUtil } from '../util/snackbar.util';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    providers: [CubeService, SnackBarUtil]
})

export class HomeComponent implements OnInit {

    Cubes: Cube[] = new Array<Cube>();

    constructor(public dialog: MatDialog, private snackbarutil: SnackBarUtil, private cubeService: CubeService) { }

    ngOnInit() {
        this.getCubesOfCurrentUser();
    }

    createCubeList() {
        const dialogRef = this.dialog.open(CreateCubeDialogComponent, {
            data: {}
        });

        dialogRef.afterClosed()
            .subscribe(cube => {
                if (cube) {
                    this.cubeService.createCube(cube).toPromise()
                        .then(() => {
                            this.snackbarutil.open((cube as Cube).CubeName + ' created.');
                        })
                        .catch(() => {
                            this.snackbarutil.open('Failed to create the cube.');
                        });
                }
            });
    }

    getCubesOfCurrentUser() {
        this.cubeService.getCubesByUserId('8b79e8d1-caa4-49af-9b7a-709e7e640930')
            .subscribe(cubes => {
                this.Cubes = cubes;
            });
    }

}
