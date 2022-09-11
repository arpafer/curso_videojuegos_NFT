import { Component, OnInit } from '@angular/core';
import { LipService } from '../../services/lip/lip.service';
import { Observable } from 'rxjs';
import { Lip } from '../../models/lip/lip';

@Component({
   selector: 'app-game',
   templateUrl: './game.component.html',
   styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

   public balanceSC: number;
   public lips$: Observable<Lip[]>;
   public account: string;
   public accountBalance: number;
   public isContractOwner: boolean;
   public numNfts: number;

   constructor(private lipService: LipService) { }

   ngOnInit(): void {
      this.lips$ = this.lipService.getLips$();
      this.onNewNFT();
      this.balanceSmartContract();
      this.account = this.lipService.getConnectedAccount();
      this.getAccountBalance();
      this.getContractOwner();
   }

   onNewNFT(): void {
      this.lips$.subscribe(
         (lips: Lip[]) => {
            this.balanceSmartContract();
            this.getAccountBalance();
         }, (error: any) => {
            console.log(error.message);
         }
      );
   }

   getContractOwner(): void {
      this.lipService.isContractOwner().then((result) => {
         this.isContractOwner = result;
      }
      ).catch((err: any) => {
         console.log(err.message);
      });
   }

   getAccountBalance(): void {      
      this.lipService.accountInfo(this.account).then(
         (balance: number) => {
            this.accountBalance = balance;
         }
      ).catch((err: any) => {
         console.log(err.message);
      });
   }

   balanceSmartContract(): void {
      this.lipService.balanceSmartContract().then(
         (balance: number) => {
            this.balanceSC = balance;
         }
      ).catch((err: any) => {
         console.log(err.message);
      });
   }

   clickMintear(): void {
      this.lipService.mintNFT(this.lipService.getSubstringAccountAddress(10)).then(
         (value) => {
            this.lipService.success();
            // console.warn("POR AQUI");
         }
      ).catch((err) => {
         console.warn(err.message);
      });
   }

   retirarMoney(): void {
      this.lipService.getEthersOwner().then(
         (value) => {
            this.balanceSmartContract();
            this.getAccountBalance();
            this.lipService.success();
         }
      ).catch((err) => {
         console.warn(err.message);
      });
   }

   setNFTCount(numNFTs: number): void {
      this.numNfts = numNFTs;
   }
}
