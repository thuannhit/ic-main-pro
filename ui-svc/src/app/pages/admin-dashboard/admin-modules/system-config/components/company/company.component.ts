import {
  Component,
  OnInit,
  PLATFORM_ID,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Inject
} from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms'

import { isPlatformBrowser } from '@angular/common'

import { Router } from '@angular/router';
import { SystemConfigService } from '../../system-config.service'
interface DataItem {
  company_name: string;
  tax_code: number;
  address: string;

}
import { Observable, Subject } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'company',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit, AfterViewInit {

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private formBuilder: FormBuilder,
    private sysConfigService: SystemConfigService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  isCollapsed = false;
  isCreatingNewOne: boolean = false
  newCompanyForm: FormGroup
  searchValue = '';
  visible = false;
  listOfDisplayData: Observable<DataItem[]>;
  listOfData: DataItem[];

  ngOnInit() {
    this.prepareForm()
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.getCurrentCompanies()
    }
  }

  onClickCreateNewCompany() {
    this.isCreatingNewOne = true
  }

  onClickCancelCompanyCreationForm() {
    this.isCreatingNewOne = false
  }

  doCreateNewCompany() {
    const formValue = this.newCompanyForm.value
    const oNewCompany = {
      company_name: formValue.companyName,
      address: formValue.address,
      tax_code: formValue.taxCode
    }
    this.sysConfigService.createNewCompany(oNewCompany).subscribe((res: any) => {
      this.getCurrentCompanies()
    }, (err: any) => {
      console.log(err);
      // this.isLoadingResults = false;
    });
  }

  prepareForm() {
    this.newCompanyForm = this.formBuilder.group({
      companyName: [null, Validators.required],
      address: [null, Validators.required],
      taxCode: [null],
    });
  }
  get f() { return this.newCompanyForm.controls; }

  private getCurrentCompanies() {
    this.sysConfigService.getCompaniesList().subscribe((res: any) => {
      this.listOfDisplayData = res.data
      this.listOfData = res.data
      this.changeDetectorRef.detectChanges()
    }, (err: any) => {
      console.log(err);
    });
  }

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    // this.listOfDisplayData = this.listOfData.filter((item: DataItem) => item.company_name.indexOf(this.searchValue) !== -1);
  }
}
