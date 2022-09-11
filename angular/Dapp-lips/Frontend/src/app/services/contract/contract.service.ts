import { Inject, Injectable } from '@angular/core';
import { WEB3 } from '../../core/web3';
//import contract from 'truffle-contract'; //acceso a libreria deprecada
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject, Observable } from 'rxjs';

import Web3 from 'web3';
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { environment } from '../../../environments/environment.prod';

declare let require: any;
const lipsContractAbi = require('../../../../../Blockchain/build/contracts/LipToken.json');
declare let window: any;

@Injectable({
  providedIn: 'root'
})

export class ContractService {
  public accountsObservable = new Subject<string[]>();
  public compatible: boolean;
  protected web3Modal;
  protected web3js: Web3;
  protected provider;
  protected accounts;
  protected balance;
  protected contract;
  protected contractAddress: string;

  constructor(@Inject(WEB3) protected web3: Web3, protected snackbar: MatSnackBar) {
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider, // required
        options: {
          infuraId: "27e484dcd9e3efcfd25a83a78777cdf1" // required
        }
      }
    };

    this.web3Modal = new Web3Modal({
      network: "ganache", // optional
      cacheProvider: true, // optional
      providerOptions, // required
      theme: {
        background: "rgb(39, 49, 56)",
        main: "rgb(199, 199, 199)",
        secondary: "rgb(136, 136, 136)",
        border: "rgba(195, 195, 195, 0.14)",
        hover: "rgb(16, 26, 32)"
      }
    });
  }


  async connectAccount(): Promise<any> {
    // this.provider = await this.web3Modal.connect(); // set provider    
    // this.web3js = new Web3(this.provider); // create web3 instance
    this.web3js = new Web3(window.ethereum);
    // this.accounts = await this.web3js.eth.getAccounts();
    this.accounts = await this.web3js.eth.getAccounts();
    return this.accounts;
  }

  async accountInfo(accounts): Promise<number> {
    //  this.provider = await this.web3Modal.connect(); // set provider    
    this.web3js = new Web3(window.ethereum);
    console.log("En accountInfo");
    const initialvalue = await this.web3js.eth.getBalance(this.accounts[0]);
    this.balance = this.web3.utils.fromWei(initialvalue, 'ether');
    console.log("BALANCE: " + this.balance);
    return this.balance;
  }

  async setContractInfo(): Promise<void> {
    const networkId = environment.NETWORK_ID_GANACHE;
    const networkData = lipsContractAbi.networks[networkId];
    if (networkData !== undefined) {
      const abi = lipsContractAbi.abi;
      this.contractAddress = networkData.address;
      // console.log("address Contract: " + address);
      this.contract = new this.web3.eth.Contract(abi, this.contractAddress);
    }
  }

  getContractAddress(): any {
    return this.contractAddress;
  }

  getConnectedAccount(): string {
    return this.accounts[0];
  }

  trasnferEther(originAccount, destinyAccount, amount) {
    const that = this;

    return new Promise((resolve, reject) => {
      var contract = require("@truffle/contract"); // acceso a nueva version de libreria
      const paymentContract = contract(lipsContractAbi);
      paymentContract.setProvider(this.provider);
      paymentContract.deployed().then((instance) => {
        let finalAmount = this.web3.utils.toBN(amount)
        console.log(finalAmount)
        return instance.nuevaTransaccion(
          destinyAccount,
          {
            from: originAccount[0],
            value: this.web3.utils.toWei(finalAmount, 'ether')
          }
        );
      }).then((status) => {
        if (status) {
          return resolve({ status: true });
        }
      }).catch((error) => {
        console.log(error);

        return reject('Error transfering Ether');
      });
    });
  }


  failure(message: string) {
    const snackbarRef = this.snackbar.open(message);
    snackbarRef.dismiss();
  }

  success() {
    const snackbarRef = this.snackbar.open('Transaction complete successfully');
    snackbarRef.dismiss();
  }
}
