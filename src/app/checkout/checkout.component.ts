import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subject, Subscription } from 'rxjs';
import { HttpService } from "../order/http.service";
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
  message: string | null = null;

  constructor(public httpService: HttpService, private activateRoute: ActivatedRoute, private router: Router, public checkoutService: CheckoutService) {
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
    const orderStatus = new OrderStatus("Отмененные", "3");
    if(this.order) {
      this.order.orderStatusId = orderStatus;
      this.httpService.updateOrder(this.order)
      .subscribe(order => {
        if(this.order) {
          this.message = 'Заказ номер ' + this.order.id + ' отменен';
          setTimeout(() => {
           this.router.navigate(['/']) 
          }, 5000);
        } 
      });
    }
  }

   ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
