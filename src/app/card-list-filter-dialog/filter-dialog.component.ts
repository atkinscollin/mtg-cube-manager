import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CardList } from '../models/card-list';
import { ColorUtils } from '../util/color-util';
import { Color } from '../models/color';
import { Card, Set, Sets, Types, Subtypes, Supertypes } from 'mtgsdk-ts';
import { FormControl } from '@angular/forms';
import { MathUtils } from '../util/math';
import { SortUtils } from '../util/sort.util';

@Component({
    selector: 'filter-dialog',
    templateUrl: 'filter-dialog.component.html',
})

/**
 * TODO
 * - 
 */

export class FilterDialog {

    private colorUtils = new ColorUtils();
    private sortUtils: SortUtils = new SortUtils();
    private mathUtils: MathUtils = new MathUtils();

    private CardList: CardList = new CardList();
    private FilterCards: Card[] = new Array<Card>();

    private Sets: Set[] = new Array<Set>();
    private setsFormControl: FormControl = new FormControl();
    private Rarities: string[] = ['Special', 'Mythic Rare', 'Rare', 'Uncommon', 'Common', 'Basic Land'];
    private raritiesFormControl: FormControl = new FormControl();

    private nameIncludes: string;
    private textIncludes: string;

    private colors: Color[] = this.colorUtils.getColors();
    private colorGate: string = "or";
    private multicolor: boolean = true;

    private operators: string[] = ['=', '!=', '<', '>', '<=', '>=']
    private cmcOperator: string = '=';
    private cmc: number;

    private duplicates: boolean = false;

    private Types: string[] = new Array<string>();
    private typesFormControl: FormControl = new FormControl();
    private Subtypes: string[] = new Array<string>();
    private subtypesFormControl: FormControl = new FormControl();
    private Supertypes: string[] = new Array<string>();
    private supertypesFormControl: FormControl = new FormControl();

    constructor(public dialogRef: MatDialogRef<FilterDialog>, @Inject(MAT_DIALOG_DATA) data: any) {
        this.CardList = data.CardList;
        this.FilterCards = data.FilterCards;

        this.setsFormControl.disable;
        this.typesFormControl.disable();
        this.supertypesFormControl.disable();
        this.subtypesFormControl.disable();

        Sets.all({})
            .on('data', set => this.Sets.push(set))
            .on('end', () => {
                this.sortUtils.alphabetical(this.Sets);
                this.setsFormControl.enable();
            });
        Types.all()
            .then(types => {
                this.Types = types;
                this.typesFormControl.enable();
            });
        Subtypes.all()
            .then(subtypes => {
                this.Subtypes = subtypes;
                this.subtypesFormControl.enable();
            });
        Supertypes.all()
            .then(supertypes => {
                this.Supertypes = supertypes;
                this.supertypesFormControl.enable();
            });
    }

    private applyFilters() {
        this.resetFilter();

        if (this.nameIncludes && this.nameIncludes != '') {
            this.FilterCards = this.CardList.Cards.filter(card => !card.name.toLowerCase().includes(this.nameIncludes.toLowerCase()));
        }
        if (this.textIncludes && this.textIncludes != '') {
            this.FilterCards = this.CardList.Cards.filter(card => {
                let cardAny: any = card as any;
                return !((card.originalText && card.originalText.toLowerCase().includes(this.textIncludes.toLowerCase()))
                    || (cardAny.text && cardAny.text.toLowerCase().includes(this.textIncludes.toLowerCase())));
            });
        }

        if (this.setsFormControl.value) {
            this.FilterCards = this.CardList.Cards.filter(card => !this.setsFormControl.value.some(val => val.code == card.set));
        }
        if (this.raritiesFormControl.value) {
            this.FilterCards = this.CardList.Cards.filter(card => !this.raritiesFormControl.value.some(val => val == card.rarity));
        }

        if (this.colors.some(color => color.Checked)) {
            this.FilterCards = this.CardList.Cards.filter(card => !this.isSelectedColor(card));
        } else if (this.multicolor && this.colorGate == 'and') {
            this.FilterCards = this.CardList.Cards.filter(card => !(card.colorIdentity && card.colorIdentity.length > 1));
        }

        if (this.cmc && this.cmcOperator) {
            this.FilterCards = this.CardList.Cards.filter(card => this.mathUtils.compareWithStringOperator(this.cmcOperator, card.cmc, this.cmc));
        }

        if (this.duplicates) {
            this.FilterCards = this.CardList.Cards.filter(card1 => !this.CardList.Cards.some(card2 => card1 != card2 && card1.name == card2.name));
        }

        if (this.typesFormControl.value) {
            this.FilterCards = this.CardList.Cards.filter(card => !this.typesFormControl.value.some(val => card.types && card.types.includes(val)));
        }
        if (this.subtypesFormControl.value) {
            this.FilterCards = this.CardList.Cards.filter(card => !this.subtypesFormControl.value.some(val => card.subtypes && card.subtypes.includes(val)));
        }
        if (this.supertypesFormControl.value) {
            this.FilterCards = this.CardList.Cards.filter(card => !this.supertypesFormControl.value.some(val => card.supertypes && card.supertypes.includes(val)));
        }

        this.closeDialog();
    }

    private closeDialog() {
        this.dialogRef.close(this.FilterCards);
    }

    private getSelectedColorIdentitys(): string[] {
        return this.colors.filter(color => color.Checked).map(color => color.Identity);
    }

    private isSelectedColor(card: Card): boolean {
        if (this.colorGate == 'and') {
            return this.getSelectedColorIdentitys().every(selectedColorIdentity => card.colorIdentity
                ? this.mapToStringArray(card.colorIdentity).includes(selectedColorIdentity)
                && ((!this.multicolor && card.colorIdentity.length == 1) || (this.multicolor && card.colorIdentity.length > 1))
                : selectedColorIdentity == this.colorUtils.getColorless().Identity);
        } else {
            return this.getSelectedColorIdentitys().some(selectedColorIdentity => card.colorIdentity
                ? this.mapToStringArray(card.colorIdentity).includes(selectedColorIdentity)
                && !(!this.multicolor && card.colorIdentity.length > 1)
                : selectedColorIdentity == this.colorUtils.getColorless().Identity);
        }
    }

    private mapToStringArray(array: any[]): string[] {
        return array.map(obj => obj.toString());
    }

    private resetFilter() {
        this.FilterCards = new Array<Card>();
    }

}
