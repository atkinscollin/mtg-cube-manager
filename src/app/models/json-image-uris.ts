import { ImageUris } from "./image-uris";

// Modeled from https://scryfall.com/docs/api/images
export class JsonImageUris
{
    png: string;
    border_crop: string;
    art_crop: string;
    large: string;
    normal: string;
    small: string;

    // convertToLocalImageUris(): ImageUris {
    //     var localImageUris = new ImageUris();
    //     localImageUris.Png = this.png;
    //     localImageUris.BorderCrop = this.border_crop;
    //     localImageUris.ArtCrop = this.art_crop;
    //     localImageUris.Large = this.large;
    //     localImageUris.Normal = this.normal;
    //     localImageUris.Small = this.small;
    //     return localImageUris;
    // }
}