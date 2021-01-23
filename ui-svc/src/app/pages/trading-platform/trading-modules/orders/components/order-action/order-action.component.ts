import { Component, OnInit } from '@angular/core'
import {
    FormBuilder,
    FormGroup,
    Validators
} from '@angular/forms'
import { OrdersService } from '../../orders.service'

@Component({
    selector: 'order-action',
    templateUrl: './order-action.component.html',
    styleUrls: ['./order-action.component.scss']
})
export class OrderActionComponent implements OnInit {

    icOrderForm: FormGroup
    publishedICList: any[] = []

    constructor(private formBuilder: FormBuilder, private ordersService: OrdersService) {
    }

    ngOnInit(): void {
        this.prepareActionForm()
        this.fetchPublishedICList()
    }

    fetchPublishedICList(): void {
        this.ordersService.getAvailablePublishedICProduct().subscribe((oRs) => {
            if (!oRs.error && oRs.data) {
                this.publishedICList = oRs.data
            }
        }, (err) => {
            console.log(err)
        })
    }

    prepareActionForm(): void {
        this.icOrderForm = this.formBuilder.group({
            published_ic: [null, [Validators.required]],
            amount: [null, [Validators.required, Validators.min(1)]],
            type: [1, [Validators.required, Validators.pattern('1|2')]]
        })
    }

    get f(): any {
        return this.icOrderForm.controls
    }

    submitOrder(): void {
        for (const field of Object.keys(this.f)) {
            this.f[field].markAsDirty()
            this.f[field].updateValueAndValidity()
        }

        if (!this.icOrderForm.valid) {
            return
        }

        const publishedIC = this.f._published_ic.value
        const oData = {
            _published_ic_id: publishedIC._id,
            amount: this.f.amount.value,
            type: this.f.type.value,
            price: this.f.amount.value * publishedIC.price
        }

        console.log(oData)
    }
}
