import _r1 from "../../assets/images/rarity/_rarity_1.png";
import _r2 from "../../assets/images/rarity/_rarity_2.png";
import _r3 from "../../assets/images/rarity/_rarity_3.png";
import { LipDetails } from './LipDetails/lip-details';

export class Lip {

    private name: string;
    private rarityImage: any;
    private dna: string;
    private details: LipDetails;
    
    constructor(name: string, rarity: number, dna: string) {
        this.name = name;
        this.setRarity(rarity);
        this.setDna(dna);
        this.setDetails();
    }   

    private setRarity(rarity: number): void {
       this.rarityImage = _r1;
       if (rarity >= 80) {
          this.rarityImage = _r2;
       }
       if (rarity >= 95) {
        this.rarityImage = _r3;
       }
    }

    private setDna(dnaStr: string): void {
        while (dnaStr.length < 16) {
            this.dna = "0" + dnaStr;
        }
    }

    private setDetails(): void {
       this.details = new LipDetails(this.dna);
    }
}
