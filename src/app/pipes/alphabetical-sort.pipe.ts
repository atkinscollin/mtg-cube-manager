import { Pipe, PipeTransform } from '@angular/core';
import { SortUtils } from '../util/sort.util';

@Pipe({
    name: 'alphabeticalSort',
    pure: false
})

export class AlphabeticalSortPipe implements PipeTransform {
    transform(array: any[]): any[] {
        if (!array || array.length <= 1) {
            return array;
        }
        
        return new SortUtils().alphabetical(array);
    }
}