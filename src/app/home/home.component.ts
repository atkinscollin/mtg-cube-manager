import { Component, OnInit } from '@angular/core';
import { CubeService } from '../services/cube.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateCubeDialog } from '../create-cube-dialog/create-cube-dialog.component';
import { Cube } from '../models/cube';
import { SnackBarUtil } from '../util/snackbar.util';

@Component({
    selector: 'home',
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
        const dialogRef = this.dialog.open(CreateCubeDialog, {
            data: {}
        });

        dialogRef.afterClosed()
            .subscribe(cube => {
                if (cube) {
                    this.cubeService.createCube(cube)
                        .then(() => {
                            this.snackbarutil.open((cube as Cube).CubeName  + ' created successfully.');
                        })
                        .catch(() => {
                            this.snackbarutil.open('Failed to create cube.');
                        });
                }
            });
    }

    getCubesOfCurrentUser() {
        this.cubeService.getCubesByUserId('8b79e8d1-caa4-49af-9b7a-709e7e640930')
            .then(cubes => {
                this.Cubes = cubes;
                this.snackbarutil.open('Got this many cubes: ' + cubes.length);
                console.log(cubes.length);
            })
            .catch(() => {
                this.snackbarutil.open('Failed to get cubes.');
            });
    }

}
