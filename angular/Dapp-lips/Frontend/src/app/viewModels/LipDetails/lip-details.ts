export class LipDetails {
    private bg: number;
    private mask: number;
    private line: number;
    private addon: number;
    private addonMouth1: number;
    private addonMouth2: number;
    private addonMouth3: number;

    public constructor(dna: string) {
        this.bg = parseFloat(dna.substring(0, 2)) % 5;
        this.mask = parseFloat(dna.substring(2, 4)) % 5;
        this.line = parseFloat(dna.substring(4, 6)) % 5;
        this.addon = parseFloat(dna.substring(6, 8)) % 5;
        this.addonMouth1 = parseFloat(dna.substring(8, 10)) % 5;
        this.addonMouth2 = parseFloat(dna.substring(10, 12)) % 5;
        this.addonMouth3 = parseFloat(dna.substring(12, 14)) % 5;
    }

    public getBg(): number {
        return this.bg;
    }

    public getMask(): number {
        return this.mask;
    }

    public getLine(): number {
        return this.line;
    }

    public getAddon(): number {
        return this.addon;
    }

    public getAddonMouth1(): number {
        return this.addonMouth1;
    }

    public getAddonMouth2(): number {
        return this.addonMouth2;
    }

    public getAddonMouth3(): number {
        return this.addonMouth3;
    }
}
