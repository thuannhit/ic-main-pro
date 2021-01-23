import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard.component';
const routes: Routes = [
  {
    path: '', component: AdminDashboardComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'system-config' },
      { path: 'ic-products', loadChildren: () => import('./admin-modules/ic-products/').then(m => m.ICProductsHomeModule) },
      { path: 'system-config', loadChildren: () => import('./admin-modules/system-config').then(m => m.SystemConfigModule) },
      { path: 'users', loadChildren: () => import('./admin-modules/users').then(m => m.UsersHomeModule) },
      { path: 'cash-management', loadChildren: () => import('./admin-modules/cash-management').then(m => m.CashManagementModule) },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminDashboardRoutingModule { }
