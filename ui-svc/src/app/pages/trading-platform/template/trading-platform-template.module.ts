import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';

import { TradingPlatformHeaderComponent } from "./header/header.component";
import { TradingPlatformQuickViewComponent } from './quick-view/quick-view.component';
import { TradingPlatformFooterComponent } from "./footer/footer.component";

import { ThemeConstantService } from '../../../shared/services/theme-constant.service';
import { SharedModule } from '../../../shared/shared.module'
const antdModule = [
    SharedModule,
    NzAvatarModule,
    NzBadgeModule,
    NzRadioModule,
    NzDropDownModule,
    NzListModule,
    NzDrawerModule,
    NzDividerModule,
    NzSwitchModule,
    NzInputModule,
    NzButtonModule
]

@NgModule({
    exports: [
        CommonModule,
        TradingPlatformHeaderComponent,
        TradingPlatformQuickViewComponent,
        TradingPlatformFooterComponent
    ],
    imports: [
        RouterModule,
        CommonModule,
        ...antdModule
    ],
    declarations: [
        TradingPlatformHeaderComponent,
        TradingPlatformQuickViewComponent,
        TradingPlatformFooterComponent
    ],
    providers: [
        ThemeConstantService
    ]
})

export class TradingPlatformTemplateModule { }
