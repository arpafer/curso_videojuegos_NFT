// import _r1 from "../../assets/images/rarity/_rarity_1.png";
// import _r2 from "../../assets/images/rarity/_rarity_2.png";
// import _r3 from "../../assets/images/rarity/_rarity_3.png";
import { LipDetails } from './LipDetails/lip-details';

export class LipView {

    private name: string;
    private rarityImage: string;
    private dna: string;
    private details: LipDetails;
    private _r1 = "../../assets/images/rarity/_rarity_1.png";
    private _r2 = "../../assets/images/rarity/_rarity_2.png";
    private _r3 = "../../assets/images/rarity/_rarity_3.png";

    constructor(name: string, rarity: number, dna: number) {
        this.name = name;
        this.dna = dna.toString();
        this.setRarity(rarity);
        this.setDna(dna.toString());
        this.setDetails();
    }

    private setRarity(rarity: number): void {
        this.rarityImage = this._r1;
        if (rarity >= 80) {
            this.rarityImage = this._r2;
        }
        if (rarity >= 95) {
            this.rarityImage = this._r3;
        }
    }

    private setDna(dnaStr: string): void {
        while (this.dna.length < 16) {
            this.dna = "0" + dnaStr;
        }
    }

    private setDetails(): void {
        this.details = new LipDetails(this.dna);
    }

    public getDetailsBg(): number {
        return this.details.getBg();
    }

    public getDetailsMask(): number {
        return this.details.getMask();
    }

    public getDetailsLine(): number {
        return this.details.getLine();
    }

    public getDetailsAddon(): number {
        return this.details.getAddon();
    }

    public getDetailsAddonMouth1(): number {
        return this.details.getAddonMouth1();
    }

    public getDetailsAddonMouth2(): number {
        return this.details.getAddonMouth2();
    }

    public getDetailsAddonMouth3(): number {
        return this.details.getAddonMouth3();
    }

    public getRarity(): string {
        return this.rarityImage;
    }
}
