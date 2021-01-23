import { NgModule } from '@angular/core';
import { NZ_ICONS, NzIconModule } from 'ng-zorro-antd/icon';

import {
  MenuFoldOutline,
  MenuUnfoldOutline,
  FormOutline,
  DashboardOutline,
  ArrowUpOutline,
  ArrowDownOutline,
  ArrowLeftOutline,
  ArrowRightOutline,
  CloseOutline,
  CheckCircleOutline,
  CheckCircleTwoTone
} from '@ant-design/icons-angular/icons';

const icons = [
  MenuFoldOutline,
  MenuUnfoldOutline,
  DashboardOutline,
  FormOutline,
  ArrowUpOutline,
  ArrowDownOutline,
  ArrowLeftOutline,
  ArrowRightOutline,
  CloseOutline,
  CheckCircleOutline,
  // CheckCircleTwoTone
];

@NgModule({
  imports: [NzIconModule],
  exports: [NzIconModule],  
  providers: [
    { provide: NZ_ICONS, useValue: icons }
  ]
})
export class IconsProviderModule {
}
