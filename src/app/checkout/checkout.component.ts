import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subject, Subscription } from 'rxjs';
import { HttpService } from "../order/http.service";
import { OrderService } from "../order/order.service";
import { CheckoutService } from "./checkout.service";
import { OrderStatus, Order } from "../order/order";
import { OrderDataComponent } from "../order/order-data/order-data.component";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  
  id: string | null = null;
  order: Order | null = null;
  private subscription: Subscription;

  constructor(public httpService: HttpService, private orderService: OrderService, private activateRoute: ActivatedRoute, public checkoutService: CheckoutService, private router: Router) {
    this.subscription = activateRoute.params.subscribe(params=>this.id=params['id']);
  }

  ngOnInit(): void {
    if(this.id) {
      this.getOrder();
    }
    
  }

  getOrder(): void {
    if(this.id) {
      this.httpService.getOrder(this.id)
      .subscribe(order => {
        if(order) {
          this.order = order;
          this.checkoutService.setOrder(order);
        }
      });
    }
  }

  deleteOrder() {
    if(this.id) {
      this.httpService.deleteOrder(this.id)
      .subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }

}
