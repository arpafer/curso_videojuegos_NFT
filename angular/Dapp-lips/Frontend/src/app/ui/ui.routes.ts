import { Routes } from '@angular/router';

// Components
import {AccountComponent} from "./account/account.component";
import {ErrorComponent} from "./error/error.component";
import {HomeComponent} from "./home/home.component";
import {TransactionComponent} from "./transaction/transaction.component";
import { MainComponent } from './main/main.component';
import { GameComponent } from './game/game.component';

export const UiRoute: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full'},
  { path: 'main', component: MainComponent},
  { path: 'game', component: GameComponent},
  { path: 'money', component: TransactionComponent },
  { path: 'home', component: HomeComponent},
  { path: 'account', component: AccountComponent},
  { path: '404', component: ErrorComponent },
  { path: '**', redirectTo: '/404' },
];
