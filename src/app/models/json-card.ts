import { Card } from "./card";
import { JsonImageUris } from "./json-image-uris";
import { JsonRelatedUris } from "./json-related-uris";

// Modeled from https://scryfall.com/docs/api/cards for extracting data from the scryfall data json
export class JsonCard {
    // Core
    id: string;
    lang: string;
    prints_search_uri: string;
    rulings_uri: string;
    scryfall_uri: string;
    uri: string;

    // Gameplay
    cmc: number;
    colors: string[];
    color_identity: string[];
    color_indicator: string;
    foil: boolean;
    layout: string;
    loyalty: string;
    mana_cost: string;
    name: string;
    oracle_text: string;
    power: string;
    toughness: string;
    type_line: string;

    // Unique to print
    artist: string;
    collector_number: string;
    digital: boolean;
    flavor_text: string;
    image_uris: JsonImageUris;
    rarity: string;
    related_uris: JsonRelatedUris;
    scryfall_set_uri: string;
    set: string;
    set_name: string;
    set_search_uri: string;
    set_uri: string;
    timeshifted: boolean;

    /* Fields able to be populated by scryfall json data (some are not included like eur, usd, tix), 
    but not yet implemented in the services side because of no planned use. */
    // arena_id: number;
    // mtgo_id: number;
    // mtgo_foil_id: number;
    // multiverse_ids: number[];
    // oracle_id: string;
    // all_parts: RelatedCard[];
    // card_faces: Card[];
    // edhrec_rank: number;
    // hand_modifier: string;
    // legalities: Legality[];
    // life_modifer: string;
    // non_foil: boolean;
    // reserved: boolean;
    // border_color: string;
    // colorshifted: boolean;
    // eur: string;
    // frame: string;
    // full_art: boolean;
    // futureshifted: boolean;
    // high_res_image: boolean;
    // illustration_id: string;
    // printed_name: string;
    // printed_text: string;
    // printed_type_line: string;
    // purchase_uris: Object;
    // reprint: boolean;
    // story_spotlight_number: string;
    // story_spotlight_uri: string;
    // tix: string;
    // usd: string;
    // watermark: string;

    constructor() { }

    // convertToLocalCard(): Card {
    //     var card = new Card();
    //     card.Id = this.id;
    //     card.Lang = this.lang;
    //     card.PrintsSearchUri = this.print_search_uri;
    //     card.RulingsUri = this.rulings_uri;
    //     card.ScryfallUri = this.scryfall_uri;
    //     card.Uri = this.uri;

    //     card.Cmc = this.cmc;
    //     card.Colors = this.colors;
    //     card.ColorIdentity = this.color_identity;
    //     card.ColorIndicator = this.color_indicator;
    //     card.Foil = this.foil;
    //     card.Layout = this.layout;
    //     card.Loyalty = this.loyalty;
    //     card.ManaCost = this.mana_cost;
    //     card.Name = this.name;
    //     card.OracleText = this.oracle_text;
    //     card.Power = this.power;
    //     card.Toughness = this.toughness;
    //     card.TypeLine = this.type_line;

    //     card.Artist = this.artist;
    //     card.CollectorNumber = this.collector_number;
    //     card.Digital = this.digital;
    //     card.FlavorText = this.flavor_text;
    //     card.ImageUris = this.image_uris.convertToLocalImageUris();
    //     card.Rarity = this.rarity;
    //     card.RelatedUris = this.related_uris.convertToLocalRelatedUris();;
    //     card.ScryfallSetUri = this.scryfall_set_uri;
    //     card.Set = this.set;
    //     card.SetName = this.set_name;
    //     card.SetSearchUri = this.set_search_uri;
    //     card.SetUri = this.set_uri;
    //     card.Timeshifted = this.timeshifted;
    //     return card;
    // }
}