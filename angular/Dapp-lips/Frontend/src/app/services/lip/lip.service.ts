import { Inject, Injectable } from '@angular/core';
import { ContractService } from '../contract/contract.service';
import Web3 from 'web3';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WEB3 } from '../../core/web3';

@Injectable({
  providedIn: 'root'
})
export class LipService extends ContractService {

  constructor(@Inject(WEB3) protected web3: Web3, protected snackbar: MatSnackBar) { 
    super(web3, snackbar);
  }
}
