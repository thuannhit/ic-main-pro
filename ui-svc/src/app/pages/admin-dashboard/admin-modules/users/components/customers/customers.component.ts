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

import { UserService } from '../../../users/users.service'
import { UsersListResDTO } from '../../dtos/users-list-response.dto'
import { UserDTO } from '../../dtos/user.dto'
import { ICustomer } from '../../interfaces/customer.interface'

@Component({
  selector: 'customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit, AfterViewInit {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private cdr: ChangeDetectorRef
  ) { }

  isCollapsed = false;
  listOfData: ICustomer[]

  ngOnInit() {
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.getCurrentCustomers()
    }
  }

  private getCurrentCustomers() {
    this.userService.getCustomersList().subscribe((res: UsersListResDTO) => {
      this.listOfData = res.data.map((element: UserDTO) => {
        const interEle: ICustomer = { ...element, isSelected: false }
        return interEle
      })
    }, (err: any) => {
      //TODO: Error handling
      console.log(err);
    });
  }

}
