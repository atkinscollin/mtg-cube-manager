import { RelatedUris } from "./related-uris";

export class JsonRelatedUris
{
    tcgplayer_decks: string;
    edhrec: string;
    mtgtop8: string;

    // convertToLocalRelatedUris(): RelatedUris {
    //     var localRelatedUris = new RelatedUris();
    //     localRelatedUris.TcgplayerDecks = this.tcgplayer_decks;
    //     localRelatedUris.Edhrec = this.edhrec;
    //     localRelatedUris.Mtgtop8 = this.mtgtop8;
    //     return localRelatedUris;
    // }
}