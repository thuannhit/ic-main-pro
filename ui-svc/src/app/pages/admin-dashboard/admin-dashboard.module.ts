import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AdminDashboardRoutingModule } from './admin-dashboard-routing.module'
import { AdminDashboardComponent } from './admin-dashboard.component'
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { FormsModule } from '@angular/forms'
import { IconsProviderModule } from '../../icons-provider.module'
import { SharedModule } from '../../shared/shared.module'
import { ThemeConstantService } from '../../shared/services/theme-constant.service'
@NgModule({
  imports: [
    CommonModule,
    AdminDashboardRoutingModule,
    NzLayoutModule,
    NzButtonModule,
    NzCardModule,
    NzAvatarModule,
    NzRateModule,
    NzBadgeModule,
    NzProgressModule,
    NzRadioModule,
    NzTableModule,
    NzDropDownModule,
    NzTimelineModule,
    NzTabsModule,
    NzTagModule,
    NzListModule,
    NzCalendarModule,
    NzToolTipModule,
    NzCheckboxModule,
    IconsProviderModule,
    NzEmptyModule,
    NzSwitchModule,
    SharedModule,
    FormsModule
  ],
  declarations: [AdminDashboardComponent],
  exports: [AdminDashboardComponent],
  bootstrap: [],
  providers: [ThemeConstantService]
})
export class AdminDashboardModule { }
