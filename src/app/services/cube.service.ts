import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Cube } from '../models/cube';

@Injectable()
export class CubeService {

    private apiPath: string = environment.url + 'api/cubes';

    constructor(private httpClient: HttpClient) { }

    getCubeByCubeId(cubeId: number) {
        return this.httpClient.get<Cube>(this.apiPath + '?cubeId=' + cubeId);
    }

    getCubesByUserId(userId: string) {
        return this.httpClient.get<Cube[]>(this.apiPath + '?userId=' + userId);
    }

    createCube(cube: Cube) {
        return this.httpClient.post<Cube>(this.apiPath, cube);
    }
}
