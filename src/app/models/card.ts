import { ImageUris } from "./image-uris";
import { RelatedUris } from "./related-uris";
import { JsonCard } from "./json-card";

export class Card {
    // Core
    Id: string;
    Lang: string;
    PrintsSearchUri: string;
    RulingsUri: string;
    ScryfallUri: string;
    Uri: string;

    // Gameplay
    Cmc: number;
    Colors: string[];
    ColorIdentity: string[];
    ColorIndicator: string;
    Foil: boolean;
    Layout: string;
    Loyalty: string;
    ManaCost: string;
    Name: string;
    OracleText: string;
    Power: string;
    Toughness: string;
    TypeLine: string;

    // Unique to print
    Artist: string;
    CollectorNumber: string;
    Digital: boolean;
    FlavorText: string;
    ImageUris: ImageUris;
    Rarity: string;
    RelatedUris: RelatedUris;
    ScryfallSetUri: string;
    Set: string;
    SetName: string;
    SetSearchUri: string;
    SetUri: string;
    Timeshifted: boolean;

    /* Fields able to be populated by scryfall json data (some not in bulk data like eur, usd, tix), 
    but not yet implemented in the services side because of no planned use. */
    // ArenaId: number;
    // MtgoId: number;
    // MtgoFoilId: number;
    // MultiverseIds: number[];
    // OracleId: string;
    // AllParts: RelatedCard[];
    // CardFaces: Card[];
    // EdhrecRank: number;
    // HandModifier: string;
    // Legalities: Legality[];
    // LifeModifer: string;
    // NonFoil: boolean;
    // Reserved: boolean;
    // BorderColor: string;
    // Colorshifted: boolean;
    // Eur: string;
    // Frame: string;
    // FullArt: boolean;
    // Futureshifted: boolean;
    // HighResImage: boolean;
    // IllustrationId: string;
    // PrintedName: string;
    // PrintedText: string;
    // PrintedTypeLine: string;
    // PurchaseUris: Object;
    // Reprint: boolean;
    // StorySpotlightNumber: string;
    // StorySpotlightUri: string;
    // Tix: string;
    // Usd: string;
    // Watermark: string;

    constructor() { 
        this.ImageUris = new ImageUris();
    }

    convertFromJsonCard(jsonCard: JsonCard) {
        this.Id = jsonCard.id;
        this.Lang = jsonCard.lang;
        this.PrintsSearchUri = jsonCard.prints_search_uri;
        this.RulingsUri = jsonCard.rulings_uri;
        this.ScryfallUri = jsonCard.scryfall_uri;
        this.Uri = jsonCard.uri;

        this.Cmc = jsonCard.cmc;
        this.Colors = jsonCard.colors;
        this.ColorIdentity = jsonCard.color_identity;
        this.ColorIndicator = jsonCard.color_indicator;
        this.Foil = jsonCard.foil;
        this.Layout = jsonCard.layout;
        this.Loyalty = jsonCard.loyalty;
        this.ManaCost = jsonCard.mana_cost;
        this.Name = jsonCard.name;
        this.OracleText = jsonCard.oracle_text;
        this.Power = jsonCard.power;
        this.Toughness = jsonCard.toughness;
        this.TypeLine = jsonCard.type_line;

        this.Artist = jsonCard.artist;
        this.CollectorNumber = jsonCard.collector_number;
        this.Digital = jsonCard.digital;
        this.FlavorText = jsonCard.flavor_text;
        this.ImageUris = new ImageUris().convertFromJsonImageUris(jsonCard.image_uris);
        this.Rarity = jsonCard.rarity;
        this.RelatedUris = new RelatedUris().convertFromJsonRelatedUris(jsonCard.related_uris);
        this.ScryfallSetUri = jsonCard.scryfall_set_uri;
        this.Set = jsonCard.set;
        this.SetName = jsonCard.set_name;
        this.SetSearchUri = jsonCard.set_search_uri;
        this.SetUri = jsonCard.set_uri;
        this.Timeshifted = jsonCard.timeshifted;
        return this;
    }
}