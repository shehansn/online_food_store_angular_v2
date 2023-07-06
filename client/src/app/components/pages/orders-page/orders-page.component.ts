import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/shared/models/Order';

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.css']
})
export class OrdersPageComponent {

  orders: Order[] = [];
  constructor(orderService: OrderService, private router: Router) {
    orderService.getOrdersForCurrentUser().subscribe({
      next: (orders) => {
        console.log('orders from order page', orders)
        this.orders = orders;
      },
      error: (err) => {
        console.log('errors from order page', err)
        router.navigateByUrl('/');
      }
    })

  }
  viewOrder(orderId: any) {
    this.router.navigateByUrl(`/track/${orderId}`);
  }
}
