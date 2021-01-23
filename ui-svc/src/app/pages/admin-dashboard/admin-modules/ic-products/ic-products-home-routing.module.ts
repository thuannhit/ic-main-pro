import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ICProductsComponent } from './components/ic-products';
const routes: Routes = [
  {
    path: '', component: ICProductsComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ICProductsRoutingModule { }
