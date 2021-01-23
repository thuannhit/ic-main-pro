import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { TopupWithdrawComponent } from './components/topup-withdraw/topup-withdraw.component';
import { ICTradingPageComponent } from './trading-page.component';
const routes: Routes = [
  {
    path: '', component: ICTradingPageComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TradingPageRoutingModule { }
