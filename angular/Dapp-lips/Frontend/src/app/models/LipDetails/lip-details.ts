export class LipDetails {    
    private bf: number;
    private mask: number;
    private line: number;
    private addon: number;
    private addonMouth1: number;
    private addonMouth2: number;
    private addonMouth3: number;

    constructor(dna: string) {
        this.bf = parseFloat(dna.substring(0, 2)) % 5;
        this.mask = parseFloat(dna.substring(2, 4)) % 5;
        this.line = parseFloat(dna.substring(4, 6)) % 5;
        this.addon = parseFloat(dna.substring(6, 8)) % 5;
        this.addonMouth1 = parseFloat(dna.substring(8, 10)) % 5;
        this.addonMouth2 = parseFloat(dna.substring(10, 12)) % 5;
        this.addonMouth3 = parseFloat(dna.substring(12, 14)) % 5;
    }
}
