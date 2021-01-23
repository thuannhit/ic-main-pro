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
import { NzMessageService } from 'ng-zorro-antd/message';

import { UserService } from '../../../users/users.service'
import { CashManagementService } from '../../cash-management.service'

import { UsersListResDTO } from '../../dtos/users-list-response.dto'
import { UserDTO } from '../../dtos/user.dto'

import { ICustomer } from '../../interfaces/customer.interface'
import { ITopupWithDrawTransferedData } from '../../interfaces/topup-withdraw-transfered-data.interface'

const TYPE = {
  UP: 1,
  DOWN: 2
}
@Component({
  selector: 'topup-withdraw',
  templateUrl: './topup-withdraw.component.html',
  styleUrls: ['./topup-withdraw.component.scss']
})
export class TopupWithdrawComponent implements OnInit, AfterViewInit {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private cdr: ChangeDetectorRef,
    private cashmangementService: CashManagementService,
    private message: NzMessageService
  ) { }

  listOfCustomers: ICustomer[]
  topupForm: FormGroup
  withdrawForm: FormGroup
  isWithdrawing: boolean = false
  isTopuping: boolean = false

  ngOnInit() {
    this.prepareForm()
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.getCurrentCustomers()
    }
  }

  doTopup() {
    this.isTopuping = true
    const inputData: ITopupWithDrawTransferedData = {
      amount: this.tf.amount.value,
      date: new Date(this.tf.date.value).getTime(),
      note: this.tf.note.value
    }
    const _user_id: number = this.tf.customer.value
    this.cashmangementService.topup(_user_id, inputData).subscribe((res) => {
      this.isTopuping = false
      this.message.create('success', `Topup successfully`);
      console.log('Topup successfully')
    }, (err: any) => {
      this.isTopuping = false
      this.message.create('error', `Topup failed: ${err}`);
    })
  }

  doWithdraw() {
    this.isWithdrawing = true
    const inputData: ITopupWithDrawTransferedData = {
      amount: this.wf.amount.value,
      date: new Date(this.wf.date.value).getTime(),
      note: this.wf.note.value
    }
    const _user_id: number = this.wf.customer.value
    this.cashmangementService.withdraw(_user_id, inputData).subscribe((res) => {
      this.isWithdrawing = false
      this.message.create('success', `Withdraw successfully`);
      console.log('Withdraw successfully')
    }, (err: any) => {
      this.isWithdrawing = false
      this.message.create('error', `Withdraw failed: ${err}`);
      
    })
  }

  private getCurrentCustomers() {
    this.userService.getCustomersList().subscribe((res: UsersListResDTO) => {
      this.listOfCustomers = res.data.map((element: UserDTO) => {
        const interEle: ICustomer = { ...element, isSelected: false }
        return interEle
      })
    }, (err: any) => {
      //TODO: Error handling
      this.message.create('error', `Customers load failed: ${err}`);
      console.log(err);
    });
  }

  private prepareForm() {
    this.topupForm = this.formBuilder.group({
      customer: [null, Validators.required],
      type: [TYPE.UP, Validators.required],
      date: [new Date(), Validators.required],
      time: [new Date(), Validators.required],
      amount: [0, Validators.required],
      note: [null],
    });
    this.withdrawForm = this.formBuilder.group({
      customer: [null, Validators.required],
      type: [TYPE.DOWN, Validators.required],
      date: [new Date(), Validators.required],
      time: [new Date(), Validators.required],
      amount: [0, Validators.required],
      note: [null],
    });
  }
  get tf() { return this.topupForm.controls; }
  get wf() { return this.withdrawForm.controls; }

}
