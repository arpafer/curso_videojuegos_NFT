import { Inject, Injectable } from '@angular/core';
import { ContractService } from '../contract/contract.service';
import Web3 from 'web3';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WEB3 } from '../../core/web3';
import { Lip } from '../../models/lip/lip';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LipService extends ContractService {

  lips$: BehaviorSubject<Lip[]>;
  lips: Lip[];
  isOwnerOfContract: boolean;

  constructor(@Inject(WEB3) protected web3: Web3, protected snackbar: MatSnackBar) {
    super(web3, snackbar);
    this.lips = [];
    this.lips$ = new BehaviorSubject<Lip[]>(this.lips);
  }

  getLips$(): Observable<Lip[]> {
    return this.lips$.asObservable();
  }

  async connect(): Promise<void> {
    await this.connectAccount().then(
      () => {
        this.setContractInfo().then(
          () => { }
        ).catch((error: any) => {
          console.warn("ERROR: " + error.message);
          throw error;
        });
      }
    ).catch(
      (error: any) => {
        throw error;
        console.warn("ERROR: " + error.message);
      }
    );
  }

  getSubstringAccountAddress(length: number): string {
    const tmp = this.getConnectedAccount().substring(0, length);
    // console.warn("SUBSTRING: " + tmp);
    return tmp;
  }

  async mintNFT(name: string): Promise<void> {
    try {
      await this.contract.methods.createRandomLip(name).send({
        from: this.getConnectedAccount(),
        value: this.web3.utils.toWei("1", "ether")
      }).once("error", (err) => {
        throw err;
      }).then((receipt) => {
        this.getOwnerLips().then(
          () => {

          }
        );
      });
    } catch (err) {
      throw err;
    }
  }

  async levelUpLip(id: number): Promise<void> {
    await this.contract.methods.levelUp(id).send(
      {
        from: this.getConnectedAccount()
      }).once("error", (err) => {
        throw err;
      }).then((receipt) => {

      });
  }

  async balanceSmartContract(): Promise<number> {
    try {
      const money: number = await this.contract.methods.moneySmartContract().call();
      /*  return money.then((value: number) => {
          return value / 1000000000000000000; */
      return money / 1000000000000000000;
      // return money;
    } catch (err) {
      throw err;
    }
  }


  async getEthersOwner(): Promise<any> {
    await this.contract.methods.withdraw().send({
      from: this.getConnectedAccount()
    }).once("error", (err) => {
      throw err;
    });
  }

  async getLips(): Promise<Lip[]> {
    try {
      this.lips = await this.contract.methods.getLips().call();
      this.lips$.next(this.lips);
      return this.lips;
    } catch (error) {
      throw error;
    }
  }

  async getOwnerLips(): Promise<void> {
    try {
      this.lips = await this.contract.methods.getOwnerLips(this.getConnectedAccount()).call();
      this.lips$.next(this.lips);      
    } catch (error) {
      throw error;
    }
  }

  async isContractOwner(): Promise<boolean> {
    try {
     this.isOwnerOfContract = await this.contract.methods.isContractOwner(this.getConnectedAccount()).call();
     return this.isOwnerOfContract;
    } catch (error) {
      throw error;
    }
  }
}
