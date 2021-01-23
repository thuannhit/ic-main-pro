import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { ThemeConstantService } from '../../../../shared/services/theme-constant.service'

@Component({
    selector: 'app-orders-layout',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

    constructor(private router: Router, private activatedRoute: ActivatedRoute, private themeService: ThemeConstantService) {
    }

    ngOnInit(): void {
    }
}
