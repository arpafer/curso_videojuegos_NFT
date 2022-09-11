import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LipService } from '../../../services/lip/lip.service';
import { Lip } from '../../../models/lip/lip';
import { LipView } from '../../../viewModels/lipView';
import { Observable } from 'rxjs';
import { Parts } from '../../../parts/parts';

@Component({
  selector: 'app-lips',
  templateUrl: './lips.component.html',
  styleUrls: ['./lips.component.scss']
})
export class LipsComponent implements OnInit {

  isContractOwner: boolean;
  @Output() NFTcount = new EventEmitter<number>();
  public lips$: Observable<Lip[]>;
  public lips: Lip[];
  public lipsView: object;
  public size: number;
  public parts: Parts;

  constructor(private lipService: LipService) { }

  ngOnInit(): void {
    this.parts = new Parts();
    this.size = 200;
    this.getContractOwner();
    this.lips$ = this.lipService.getLips$();
    this.reloadLipsViews();
    this.getLips();
  }

  getContractOwner(): void {
    this.lipService.isContractOwner().then((result) => {
       this.isContractOwner = result;
       this.getLips();
    }
    ).catch((err: any) => {
       console.log(err.message);
    });
 }

  private reloadLipsViews(): void {
    this.lips$.subscribe(
      (_lips: Lip[]) => {
        this.lipsView = [];
        // console.log("Número de lips: " + _lips.length);
        _lips.forEach(lip => {
          const lipView = new LipView(lip.name, lip.rarity, lip.dna);
          this.lipsView[lip.id] = lipView;
          // console.log("LIP ID: " + lip.id + " name: " + this.lipsView[lip.id].name);
        });
        this.NFTcount.emit(_lips.length);
      }
    );
  }

  private getLips(): void {
    if (this.isContractOwner) {
      this.lipService.getLips().then(
        () => {

        }
      ).catch((err) => {
        console.log("ERROR --> " + err.message);
      });
    } else {
      this.lipService.getOwnerLips().then(
        () => {

        }
      ).catch((err) => {
        console.log("ERROR --> " + err.message);
      });
    }
  }

  public levelUp(lip: Lip): void {
    this.lipService.levelUpLip(lip.id).then(
      (() => {
        this.getLips();
      })
    ).catch((err) => {
      console.log("ERROR --> " + err.message);
      this.lipService.failure("ERROR --> " + err.message);
    });
  }

  public getBg(lip: LipView): string {
    return this.parts.bg[lip.getDetailsBg()];
  }

  public getMask(lip: LipView): string {
    return this.parts.mask[lip.getDetailsMask()];
  }

  public getLine(lip: LipView): string {
    return this.parts.line[lip.getDetailsLine()];
  }

  public getAddon(lip: LipView): string {
    return this.parts.addon[lip.getDetailsAddon()];
  }

  public getAddonMouth1(lip: LipView): string {
    return this.parts.addonMouth1[lip.getDetailsAddonMouth1()];
  }

  public getAddonMouth2(lip: LipView): string {
    return this.parts.addonMouth2[lip.getDetailsAddonMouth2()];
  }

  public getAddonMouth3(lip: LipView): string {
    return this.parts.addonMouth3[lip.getDetailsAddonMouth3()];
  }

  public getRarity(lip: LipView): string {
    return lip.getRarity();
  }
}
