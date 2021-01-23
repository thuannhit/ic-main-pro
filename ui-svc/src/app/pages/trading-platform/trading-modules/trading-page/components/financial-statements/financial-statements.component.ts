import {
  Component,
  OnInit,
  AfterViewInit,
  PLATFORM_ID,
  Inject,
  ChangeDetectorRef
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common'
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms'
import { NzTableQueryParams } from 'ng-zorro-antd/table';

import { UserService } from '../../../users/users.service'
import { CashManagementService } from '../../cash-management.service'
import { UsersListResDTO } from '../../dtos/users-list-response.dto'
import { UserDTO } from '../../dtos/user.dto'
import { ICustomer } from '../../interfaces/customer.interface'
import { ThemeConstantService } from '../../../../../../shared/services/theme-constant.service'

@Component({
  selector: 'financial-statement',
  templateUrl: './financial-statements.component.html',
  styleUrls: ['./financial-statements.component.scss']
})
export class FinancialStatementComponent implements OnInit, AfterViewInit {
  themeColors = this.colorConfig.get().colors;
  blue = this.themeColors.blue;
  blueLight = this.themeColors.blueLight;
  cyan = this.themeColors.cyan;
  cyanLight = this.themeColors.cyanLight;
  gold = this.themeColors.gold;
  purple = this.themeColors.purple;
  purpleLight = this.themeColors.purpleLight;
  red = this.themeColors.red;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private cdr: ChangeDetectorRef,
    private cashManangementService: CashManagementService,
    private colorConfig: ThemeConstantService,
  ) { }

  listOfCustomers: ICustomer[]
  financialStatementForm: FormGroup
  limit: number = 10
  offset: number = 0

  listOfStatements = [];
  loading: boolean = false
  total: number = 0
  pageSize: number = 10
  pageIndex: number = 1
  filterGender = [
    { text: 'male', value: 'male' },
    { text: 'female', value: 'female' }
  ];
  ngOnInit() {
    this.prepareForm()
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.getCurrentCustomers()
    }
  }

  doWatch(pageIndex?: number, pageSize?: number) {
    if (this.tf.invalid) {
      return
    }
    const user_id = this.tf.customer.value
    const from_date = this.tf.rangeDate.value[0].getTime()
    const to_date = this.tf.rangeDate.value[1].getTime()
    const limit: number = pageIndex && pageSize ? pageSize  : 10
    const offset: number = pageIndex && pageSize ? (pageIndex - 1) * pageSize : 0
    this.loading = true
    this.cashManangementService.getFinancialStatements(user_id, from_date, to_date, limit, offset).subscribe((res: any) => {
      this.loading = false
      this.listOfStatements = res.data.statements
      this.total = res.data.count
      this.cdr.detectChanges();
    }, (error: any) => {
      //TODO: Error handling
      console.log(error)
    })
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    console.log(params);
    const { pageSize, pageIndex, sort, filter } = params;
    // const currentSort = sort.find(item => item.value !== null);
    // const sortField = (currentSort && currentSort.key) || null;
    // const sortOrder = (currentSort && currentSort.value) || null;
    this.doWatch(pageIndex, pageSize);
  }

  private getCurrentCustomers() {
    this.userService.getCustomersList().subscribe((res: UsersListResDTO) => {
      this.listOfCustomers = res.data.map((element: UserDTO) => {
        const interEle: ICustomer = { ...element, isSelected: false }
        return interEle
      })
    }, (err: any) => {
      //TODO: Error handling
      console.log(err);
    });
  }

  private prepareForm() {
    this.financialStatementForm = this.formBuilder.group({
      customer: [null, Validators.required],
      rangeDate: [, Validators.required],
    });
  }
  get tf() { return this.financialStatementForm.controls; }


}
