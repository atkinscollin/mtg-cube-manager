import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Card } from '../models/card';

@Component({
    selector: 'import-dialog',
    templateUrl: 'import-dialog.component.html',
})

/**
 * TODO
 * - 
 */

export class ImportDialog {

    private Cards: Card[] = new Array<Card>();
    private FilterCards: Card[] = new Array<Card>();

    private textArea: string = '';
    private acceptedFileFormats: string[] = ['.txt', '.csv', '.dec'];
    private fileNameUploaded: string = 'Import From File';
    private loading: boolean = false;
    private loadingProgress: number = 0;
    private selectAllCheckbox: boolean = false;

    constructor(private dialogRef: MatDialogRef<ImportDialog>, @Inject(MAT_DIALOG_DATA) data: any) { }

    private clear() {
        this.Cards = new Array<Card>();
        this.textArea = '';
    }

    private closeDialog() {
        this.dialogRef.close();
    }

    private convertTextToCards(cardsAsText: string, fromFile: boolean = false) {
        this.loadingProgress = 0;
        this.loading = true;
        var cardNameStringArray: string[] = cardsAsText.trim().split('\n');

        for (let i = 0; i < cardNameStringArray.length; i++) {

            let cleanedName: string = cardNameStringArray[i].normalize().toLowerCase().replace(/[^\x00-\x7F]/g, "").trim();
            if (cardNameStringArray[i].match('^[0-9] ') || cardNameStringArray[i].match('^[0-9]x ')) {
                cleanedName = cleanedName.substring(cleanedName.match('^[0-9] ') ? 2 : 3);
            }

            if (cleanedName) {
                // this.Cards.where({ name: cleanedName.trim(), orderBy: 'imageUrl' })
                //     .then(results => {
                //         if (results) {
                //             let cardFound = results.find(card => card.name.toLowerCase() == cleanedName);
                //             if (cardFound) {
                //                 this.Cards.push(cardFound);
                //                 if (!fromFile) {
                //                     this.textArea = this.textArea.replace('\n' + cardNameStringArray[i], '');
                //                 }
                //             } else {
                //                 if (fromFile) {
                //                     this.textArea += '\n' + cardNameStringArray[i];
                //                 }
                //             }
                //         }

                //         this.loadingProgress += 100 / cardNameStringArray.length;
                //         if (i + 1 == cardNameStringArray.length) {
                //             this.loading = false;
                //         }
                //     }, err => console.log(err));
            } else {
                if (i + 1 == cardNameStringArray.length) {
                    this.loading = false;
                }
            }


        };
    }

    private deleteCard(cardToDelete: Card) {
        this.Cards.splice(this.Cards.findIndex(card => card == cardToDelete), 1);
    }

    private deleteSelectedCards() {
        this.cardsSelected().forEach(card => {
            this.deleteCard(card);
        });
    }

    private cardsSelected(): Card[] {
        return this.Cards.filter(card => {
            let cardAny = card as any;
            return cardAny.selected;
        });
    }

    private onFileUpload($event) {
        let $scope = this;
        let file: File = $event.target.files[0];
        if (file && (file.name && this.acceptedFileFormats.find(ff => file.name.endsWith(ff)))) {
            this.fileNameUploaded = file.name.length > 26 ? (file.name.substr(0, 23) + '...') : file.name;

            let fileReader: FileReader = new FileReader();

            fileReader.readAsText(file);
            fileReader.onload = function (e) {
                if (fileReader.result) {
                    if (file.name.endsWith('.dec') || file.name.endsWith('.csv')) {
                        $scope.convertTextToCards(fileReader.result.toString().substring(fileReader.result.toString().indexOf('\n')));
                    } else {
                        $scope.convertTextToCards(fileReader.result.toString(), true);
                    }
                }
                fileReader.abort();
            }

        }
    }

    private import() {
        let cards: Card[] = this.cardsSelected().length > 0 ? this.cardsSelected() : this.Cards;
        this.dialogRef.close(cards);
    }

    private selectAll() {
        this.Cards.map(card => {
            let cardAny = card as any;
            return cardAny.selected = !this.selectAllCheckbox;
        });
    }

}
