import { Color } from "../models/color";

export class ColorUtils {

    constructor() { }

    getColors() {
        return [this.getWhite(), this.getBlue(), this.getBlack(), this.getRed(), this.getGreen(), this.getColorless()];
    }

    getStandardColors() {
        return [this.getWhite(), this.getBlue(), this.getBlack(), this.getRed(), this.getGreen()];
    }

    getWhite(): Color {
        return new Color('WHITE', 'W');
    }

    getBlue(): Color {
        return new Color('BLUE', 'U');
    }

    getBlack(): Color {
        return new Color('BLACK', 'B');
    }

    getRed(): Color {
        return new Color('RED', 'R');
    }

    getGreen(): Color {
        return new Color('GREEN', 'G');
    }

    getColorless(): Color {
        return new Color('COLORLESS', 'C');
    }

}