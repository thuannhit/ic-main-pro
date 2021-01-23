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
import { Router } from '@angular/router';

import { ThemeConstantService } from '../../../../../../shared/services/theme-constant.service';
import { ICProductsService } from '../../../ic-products/ic-products.service'
import { ICProductListResDTO } from '../../dtos/ic-product-list-response.dto'
import { ICProductDTO } from '../../dtos/ic-product.dto'
import { IICProduct } from '../../interfaces/ic-product.interface'

@Component({
  selector: 'ic-product',
  templateUrl: './ic-products.component.html',
  styleUrls: ['./ic-products.component.scss']
})
export class ICProductsComponent implements OnInit, AfterViewInit {

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
    private colorConfig: ThemeConstantService,
    private router: Router,
    private formBuilder: FormBuilder,
    private icProductService: ICProductsService,
    private cdr: ChangeDetectorRef
  ) { }

  isCollapsed = false;
  isCreatingNewOne: boolean = false
  newICProductForm: FormGroup
  listOfData: IICProduct[]
  isSelectingICProduct: boolean = false
  oSelectedICProduct: IICProduct

  ngOnInit() {
    this.prepareForm()
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.getCurrentICProduct()
    }
  }

  onSelectCard(oData: IICProduct) {
    this.onCancelICPublishingForm()
    this.listOfData.map(element => {
      element.isSelected = (element._id === oData._id) ? !element.isSelected : false
    })
    const index = this.listOfData.findIndex(element => element._id === oData._id)
    this.oSelectedICProduct = this.listOfData[index].isSelected ? this.listOfData[this.listOfData.findIndex(element => element._id === oData._id)] : null
    this.isSelectingICProduct = this.listOfData[index].isSelected
  }
  
  private onCancelICPublishingForm(){
    this.isSelectingICProduct = false
    this.cdr.detectChanges();
  }

  private onICProductCreationForm() {
    this.isCreatingNewOne = true
    this.cdr.detectChanges();
  }

  private onClickCancelICCreationForm() {
    this.isCreatingNewOne = false
    this.cdr.detectChanges();
  }

  doCreateNewICProduct() {
    const oICProduct = {
      _company_id: 1,
      name: this.f.icProductName.value,
      period: this.f.icPeriod.value,
      interest_rate: this.f.icInterestRate.value,
      price: this.f.icPrice.value
    }
    this.icProductService.createNewICProduct(oICProduct).subscribe((res: any) => {
      this.getCurrentICProduct()
      this.onClickCancelICCreationForm()
    }, (err: any) => {
      console.log(err);
    });
  }

  private getCurrentICProduct() {
    this.icProductService.getICProductList().subscribe((res: ICProductListResDTO) => {
      this.listOfData = res.data.map((element: ICProductDTO) => {
        const interEle: IICProduct = { ...element, isSelected: false }
        return interEle
      })
    }, (err: any) => {
      //TODO: Error handling
      console.log(err);
    });
  }

  prepareForm() {
    this.newICProductForm = this.formBuilder.group({
      icCompany: [null, Validators.required],
      icProductName: [null, Validators.required],
      icInterestRate: [null, Validators.required],
      icPeriod: [null, Validators.required],
      icPrice: [null, [Validators.required]]
    });
  }
  get f() { return this.newICProductForm.controls; }

  private unCheckICProduct(_id: number) {
    this.listOfData[this.listOfData.findIndex(x => x._id === _id)].isSelected = false;
  }

  private unCheckICProducts() {
    this.listOfData.map(element => {
      element.isSelected = false
      return element
    })
  }
}
