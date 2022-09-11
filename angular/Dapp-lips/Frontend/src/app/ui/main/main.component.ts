import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LipService } from '../../services/lip/lip.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public successConnect: string;
  public account: string;

  constructor(private lipService: LipService, private router: Router) { }

  ngOnInit(): void {
  }

  clickConectar(): void {

    this.lipService.connect().then(
      (value: any) => {
        this.successConnect = "Conectado al juego exitosamente";
        this.account = this.lipService.getConnectedAccount();
        console.log("Account: " + this.account + " contract address: " + this.lipService.getContractAddress());
        this.router.navigate(["game"]);
      }
    ).catch((error: any) => {
      this.lipService.failure("Could't get the account data, please check if metamask is running correctly and refresh the page: "
        + error.message);
    }).finally(() => {

    }
    );
  }
}
