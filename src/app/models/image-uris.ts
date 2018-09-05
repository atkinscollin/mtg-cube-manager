import { JsonImageUris } from "./json-image-uris";

export class ImageUris
{
    Png: string;
    BorderCrop: string;
    ArtCrop: string;
    Large: string;
    Normal: string;
    Small: string;

    constructor() { }

    convertFromJsonImageUris(jsonImageUris: JsonImageUris) {
        if (jsonImageUris) {
            this.Png = jsonImageUris.png;
            this.BorderCrop = jsonImageUris.border_crop;
            this.ArtCrop = jsonImageUris.art_crop;
            this.Large = jsonImageUris.large;
            this.Normal = jsonImageUris.normal;
            this.Small = jsonImageUris.small;
        }
        return this;
    }
}