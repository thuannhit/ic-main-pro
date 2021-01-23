import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TopupWithdrawComponent } from './components/topup-withdraw/topup-withdraw.component';
const routes: Routes = [
  {
    path: '', component: TopupWithdrawComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CashManagementRoutingModule { }
