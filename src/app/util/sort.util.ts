export class SortUtils {
    constructor() { }

    alphabetical(array: any[]): any[] {
        if (array && array.length > 1 && array[0] && array[0].name) {
            return array.sort((a, b) => {
                var nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();
                if (nameA < nameB)
                    return -1;
                if (nameA > nameB)
                    return 1;
                return 0;
            });
        }
    }

    

}