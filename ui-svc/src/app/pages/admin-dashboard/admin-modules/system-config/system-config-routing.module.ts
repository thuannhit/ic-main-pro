import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SystemConfigComponent } from './system-config.component';
import { CompanyComponent } from './components/company'
const routes: Routes = [
  {
    path: '', component: SystemConfigComponent,
    children: [{
      path: '', pathMatch: 'full', redirectTo: 'company'
    },
    {
      path: 'company', component: CompanyComponent
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemConfigRoutingModule { }
