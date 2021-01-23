import { NgModule } from '@angular/core'
import { RouterModule, Routes, PreloadAllModules } from '@angular/router'

import { CommonLayoutComponent } from './common-layout/common-layout.component'

// import { CommonLayout_ROUTES } from "./shared/routes/common-layout.routes";

const appRoutes: Routes = [
    {
        path: '',
        component: CommonLayoutComponent,
        // children: CommonLayout_ROUTES
        children: [
            { path: '', pathMatch: 'full',redirectTo:'orders' },
            { path: 'orders', loadChildren: () => import('./trading-modules/orders/orders.module').then(m => m.OrdersModule) },
            { path: 'trading-page', loadChildren: () => import('./trading-modules/trading-page/trading-page.module').then(m => m.TradingPageModule) },
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class TradingPlarformRoutingModule {
}
