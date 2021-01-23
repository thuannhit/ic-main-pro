import {
  Component,
  OnInit,
  AfterViewInit,
  PLATFORM_ID,
  Inject,
  Input,
  Output,EventEmitter
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common'
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms'

import { ICProductsService } from '../../ic-products.service'
import { ICProductListResDTO } from '../../dtos/ic-product-list-response.dto'
import { ICProductDTO } from '../../dtos/ic-product.dto'
import { IICProduct } from '../../interfaces/ic-product.interface'

@Component({
  selector: 'ic-publishion',
  templateUrl: './ic-publishion.component.html',
  styleUrls: ['./ic-publishion.component.scss']
})
export class ICPublishionComponent implements OnInit, AfterViewInit {
  @Input() icProduct: IICProduct
  @Output("parentFun") parentFun: EventEmitter<any> = new EventEmitter();
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private formBuilder: FormBuilder,
    private icProductService: ICProductsService
  ) { }

  newICPublishionForm: FormGroup

  ngOnInit() {
    this.prepareForm()
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
    }
  }

  onClickCancelICPublishingForm() {
    this.parentFun.emit()
  }

  doPublishICProduct() {
    const oData = {
      _ic_product_id: Number(this.icProduct._id),
      published_amount: Number(this.f.publishingAmount.value),
      published_date: this.f.publishingDate.value,
      end_date: this.f.endDate.value,
      published_price: Number(this.f.publishingPrice.value)
    }
    this.icProductService.publishICProduct(oData).subscribe((res: any) => {
      this.onClickCancelICPublishingForm()
    }, (err: any) => {
      console.log(err);
    });
  }

  prepareForm() {
    this.newICPublishionForm = this.formBuilder.group({
      icProductId: [this.icProduct._id + '-' + this.icProduct.name, Validators.required],
      publishingAmount: [null, Validators.required],
      publishingDate: [new Date().getTime(), Validators.required],
      endDate: [new Date().setMonth(new Date().getMonth() + this.icProduct.period), Validators.required],
      publishingPrice: [this.icProduct.price, Validators.required],
    });
  }
  get f() { return this.newICPublishionForm.controls; }
}
