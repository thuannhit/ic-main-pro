import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { OrdersRoutingModule } from './orders-routing.module'
import { OrdersComponent } from './orders.component'
import { IconsProviderModule } from '../../../../icons-provider.module'
import { SharedModule } from '../../../../shared/shared.module'
import { ThemeConstantService } from '../../../../shared/services/theme-constant.service'
import { OrderActionComponent } from './components/order-action/order-action.component'
import { NzButtonModule } from 'ng-zorro-antd/button'
import { NzCardModule } from 'ng-zorro-antd/card'
import { NzAvatarModule } from 'ng-zorro-antd/avatar'
import { NzRateModule } from 'ng-zorro-antd/rate'
import { NzBadgeModule } from 'ng-zorro-antd/badge'
import { NzTableModule } from 'ng-zorro-antd/table'
import { NzDropDownModule } from 'ng-zorro-antd/dropdown'
import { NzTabsModule } from 'ng-zorro-antd/tabs'
import { NzTagModule } from 'ng-zorro-antd/tag'
import { NzListModule } from 'ng-zorro-antd/list'
import { NzCalendarModule } from 'ng-zorro-antd/calendar'
import { NzToolTipModule } from 'ng-zorro-antd/tooltip'
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox'
import { NzEmptyModule } from 'ng-zorro-antd/empty'
import { NzFormModule } from 'ng-zorro-antd/form'
import { NzInputModule } from 'ng-zorro-antd/input'
import { NzInputNumberModule } from 'ng-zorro-antd/input-number'
import { NzSelectModule } from 'ng-zorro-antd/select'
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker'
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker'
import { NzSpinModule } from 'ng-zorro-antd/spin'
import { NzMessageModule } from 'ng-zorro-antd/message'
import { NzStatisticModule } from 'ng-zorro-antd/statistic'
import { NzAlertModule } from 'ng-zorro-antd/alert'

@NgModule({
    imports: [
        CommonModule,
        IconsProviderModule,
        OrdersRoutingModule,
        NzButtonModule,
        NzCardModule,
        NzAvatarModule,
        NzRateModule,
        NzBadgeModule,
        NzTableModule,
        NzDropDownModule,
        NzTabsModule,
        NzTagModule,
        NzListModule,
        NzCalendarModule,
        NzToolTipModule,
        NzCheckboxModule,
        NzEmptyModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        NzFormModule,
        NzInputModule,
        NzInputNumberModule,
        NzSelectModule,
        NzDatePickerModule,
        NzTimePickerModule,
        NzSpinModule,
        NzMessageModule,
        NzStatisticModule,
        NzAlertModule
    ],
    declarations: [OrdersComponent, OrderActionComponent],
    exports: [OrdersComponent, OrderActionComponent],
    bootstrap: [],
    providers: [ThemeConstantService]
})

export class OrdersModule { }
