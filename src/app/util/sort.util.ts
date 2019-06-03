export class SortUtils {
    constructor() { }

    alphabetical(array: any[]): any[] {
        if (array && array.length > 1 && array[0] && array[0].Name) {
            return array.sort((a, b) => {
                let nameA = a.Name.toLowerCase(), nameB = b.Name.toLowerCase();
                if (nameA < nameB)
                    return -1;
                if (nameA > nameB)
                    return 1;
                return 0;
            });
        }
        else {
            return array;
        }
    }
}
