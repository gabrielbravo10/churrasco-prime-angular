import { Component, OnInit } from '@angular/core';
import { IPaginated } from 'src/app/shared/interfaces/IPaginated';
import { OrderHistory } from '../../shared/interfaces/OrderHistory';
import { OrderService } from '../../shared/services/order.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {

  orderHistoryList: OrderHistory[] = [];
  storage: Storage = sessionStorage;

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.handleOrderHistory();
  }

  handleOrderHistory() {
   const theEmail = JSON.parse(this.storage.getItem('userEmail'));

   this.orderService.getOrderHistory(theEmail).subscribe(
     (response: IPaginated<OrderHistory>) => {
       this.orderHistoryList = response.content;
     },
     (error) => {
       console.log(error);
     }
   )
  }
}
