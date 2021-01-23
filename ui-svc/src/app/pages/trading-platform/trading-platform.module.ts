import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n'
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb'

import { registerLocaleData, PathLocationStrategy, LocationStrategy } from '@angular/common'
import en from '@angular/common/locales/en'

import { TradingPlarformRoutingModule } from './trading-routing.module'
import { SharedModule } from '../../shared/shared.module'

import { AppComponent } from './trading-platform.component'
import { CommonLayoutComponent } from './common-layout/common-layout.component'

// import { NgChartjsModule } from 'ng-chartjs'
import { ThemeConstantService } from '../../shared/services/theme-constant.service'
import { TradingPlatformTemplateModule } from './template/trading-platform-template.module'
import { OrdersModule } from './trading-modules/orders/orders.module'
import { TradingPageModule } from './trading-modules/trading-page/trading-page.module'

registerLocaleData(en)

@NgModule({
    declarations: [
        AppComponent,
        CommonLayoutComponent,
    ],
    imports: [
        CommonModule,
        TradingPlarformRoutingModule,
        NzBreadCrumbModule,
        TradingPlatformTemplateModule,
        SharedModule,
        OrdersModule,
        TradingPageModule
        // NgChartjsModule
    ],
    providers: [
        {
            provide: NZ_I18N,
            useValue: en_US,
        },
        {
            provide: LocationStrategy,
            useClass: PathLocationStrategy
        },
        ThemeConstantService
    ],
    bootstrap: [AppComponent]
})
export class TradingPlatformModule { }
