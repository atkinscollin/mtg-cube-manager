import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Cube } from '../models/cube';
import { ImageUris } from '../models/image-uris';
import { RelatedUris } from '../models/related-uris';

// const httpOptions = {
//     headers: new HttpHeaders({
//         'Content-Type':  'application/json',
//         'Authorization': localStorage.getItem('authToken')
//     })
// };

@Injectable()
export class CubeService {

    private apiPath: string = environment.url + 'api/Cubes';

    constructor(private httpClient: HttpClient) { }

    getCubeByCubeId(cubeId: number) {
        return this.httpClient.get<Cube>(this.apiPath + '?cubeId=' + cubeId)
            .toPromise()
            .then((cube: Cube) => {
                return cube;
            })
            .catch(err => {
                console.log('Error retrieving cube.', err);
                return new Cube();
            });
    }

    getCubesByUserId(userId: string) {
        return this.httpClient.get<Cube[]>(this.apiPath + '?userId=' + userId)
            .toPromise()
            .then((cubes: Cube[]) => {
                return cubes;
            })
            .catch(err => {
                console.log('Error retrieving cube.', err);
                return new Array<Cube>();
            });
    }

    createCube(cube: Cube) {
        let token = localStorage.getItem('authToken');
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        };

        return this.httpClient.post<Cube>(this.apiPath, cube, httpOptions)
            .toPromise()
            .then((resultCube: Cube) => {
                return resultCube;
            })
            .catch(err => {
                console.log('Error posting cube.', err);
                return null;
            });
    }

}
