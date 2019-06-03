import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ColorUtils } from '../util/color-util';
import { Color } from '../models/color';
// import { Set, Sets, Types, Subtypes, Supertypes } from 'mtgsdk-ts';
import { FormControl } from '@angular/forms';
import { MathUtils } from '../util/math';
import { SortUtils } from '../util/sort.util';
import { Card } from '../models/card';

@Component({
    selector: 'filter-dialog',
    templateUrl: 'filter-dialog.component.html',
})

export class FilterDialog {

    private colorUtils = new ColorUtils();
    private sortUtils: SortUtils = new SortUtils();
    private mathUtils: MathUtils = new MathUtils();

    private Cards: Card[] = new Array<Card>();
    private FilterCards: Card[] = new Array<Card>();

    // private Sets: Set[] = new Array<Set>();
    setsFormControl: FormControl = new FormControl();
    Rarities: string[] = ['Special', 'Mythic Rare', 'Rare', 'Uncommon', 'Common', 'Basic Land'];
    raritiesFormControl: FormControl = new FormControl();

    nameIncludes: string;
    textIncludes: string;

    colors: Color[] = this.colorUtils.getColors();
    colorGate = 'or';
    multicolor = true;

    operators: string[] = ['=', '!=', '<', '>', '<=', '>='];
    cmcOperator = '=';
    cmc: number;

    duplicates = false;

    Types: string[] = new Array<string>();
    typesFormControl: FormControl = new FormControl();
    Subtypes: string[] = new Array<string>();
    subtypesFormControl: FormControl = new FormControl();
    Supertypes: string[] = new Array<string>();
    supertypesFormControl: FormControl = new FormControl();

    constructor(public dialogRef: MatDialogRef<FilterDialog>, @Inject(MAT_DIALOG_DATA) data: any) {
        this.Cards = data.Cards;
        this.FilterCards = data.FilterCards;

        this.setsFormControl.disable();
        this.typesFormControl.disable();
        this.supertypesFormControl.disable();
        this.subtypesFormControl.disable();

        // Sets.all({})
        //     .on('data', set => this.Sets.push(set))
        //     .on('end', () => {
        //         this.sortUtils.alphabetical(this.Sets);
        //         this.setsFormControl.enable();
        //     });
        // Types.all()
        //     .then(types => {
        //         this.Types = types;
        //         this.typesFormControl.enable();
        //     });
        // Subtypes.all()
        //     .then(subtypes => {
        //         this.Subtypes = subtypes;
        //         this.subtypesFormControl.enable();
        //     });
        // Supertypes.all()
        //     .then(supertypes => {
        //         this.Supertypes = supertypes;
        //         this.supertypesFormControl.enable();
        //     });
    }

    applyFilters() {
        this.resetFilter();

        if (this.nameIncludes && this.nameIncludes !== '') {
            this.FilterCards = this.Cards.filter(card => !card.CardName.toLowerCase().includes(this.nameIncludes.toLowerCase()));
        }
        if (this.textIncludes && this.textIncludes !== '') {
            this.FilterCards = this.Cards.filter(card => {
                const cardAny: any = card as any;
                return !((card.OracleText && card.OracleText.toLowerCase().includes(this.textIncludes.toLowerCase()))
                    || (cardAny.text && cardAny.text.toLowerCase().includes(this.textIncludes.toLowerCase())));
            });
        }

        if (this.setsFormControl.value) {
            this.FilterCards = this.Cards.filter(card => !this.setsFormControl.value.some(val => val.code === card.SetCode));
        }
        if (this.raritiesFormControl.value) {
            this.FilterCards = this.Cards.filter(card => !this.raritiesFormControl.value.some(val => val === card.Rarity));
        }

        if (this.colors.some(color => color.Checked)) {
            this.FilterCards = this.Cards.filter(card => !this.isSelectedColor(card));
        } else if (this.multicolor && this.colorGate === 'and') {
            this.FilterCards = this.Cards.filter(card => !(card.ColorIdentity && card.ColorIdentity.length > 1));
        }

        if (this.cmc && this.cmcOperator) {
            this.FilterCards = this.Cards.filter(card => this.mathUtils.compareWithStringOperator(this.cmcOperator, card.Cmc, this.cmc));
        }

        if (this.duplicates) {
            this.FilterCards = this.Cards.filter(card1 => !this.Cards.some(card2 => card1 !== card2 && card1.CardName === card2.CardName));
        }

        // TODO - Refactor with new typeline, instead of split type, subtype, supertype
        if (this.typesFormControl.value) {
            this.FilterCards = this.Cards.filter(card =>
                !this.typesFormControl.value.some(val => card.TypeLine && card.TypeLine.includes(val)));
        }
        if (this.subtypesFormControl.value) {
            this.FilterCards = this.Cards.filter(card =>
                !this.subtypesFormControl.value.some(val => card.TypeLine && card.TypeLine.includes(val)));
        }
        if (this.supertypesFormControl.value) {
            this.FilterCards = this.Cards.filter(card =>
                !this.supertypesFormControl.value.some(val => card.TypeLine && card.TypeLine.includes(val)));
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
        if (this.colorGate === 'and') {
            return this.getSelectedColorIdentitys().every(selectedColorIdentity => card.ColorIdentity
                ? card.ColorIdentity.includes(selectedColorIdentity)
                && ((!this.multicolor && card.ColorIdentity.length === 1) || (this.multicolor && card.ColorIdentity.length > 1))
                : selectedColorIdentity === this.colorUtils.getColorless().Identity);
        } else {
            return this.getSelectedColorIdentitys().some(selectedColorIdentity => card.ColorIdentity
                ? card.ColorIdentity.includes(selectedColorIdentity)
                && !(!this.multicolor && card.ColorIdentity.length > 1)
                : selectedColorIdentity === this.colorUtils.getColorless().Identity);
        }
    }

    private resetFilter() {
        this.FilterCards = new Array<Card>();
    }

}
