import { JsonRelatedUris } from "./json-related-uris";

export class RelatedUris
{
    TcgplayerDecks: string;
    Edhrec: string;
    Mtgtop8: string;

    constructor() { }

    convertFromJsonRelatedUris(jsonRelatedUris: JsonRelatedUris): RelatedUris {
        if (jsonRelatedUris) {
            this.TcgplayerDecks = jsonRelatedUris.tcgplayer_decks;
            this.Edhrec = jsonRelatedUris.edhrec;
            this.Mtgtop8 = jsonRelatedUris.mtgtop8;
        }
        return this;
    }
}