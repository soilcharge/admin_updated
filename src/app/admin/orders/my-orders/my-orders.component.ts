import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  p: number = 1;
  orders: any = [];
  constructor(private os: OrderService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    this.os.getOrders().subscribe(res=>{
      if (res['result']) {
        this.orders = res['data'];
      }
    });
  }

  editOrder(order_no, created_disctributor_id) {
    this.router.navigate(['/admin', 'order-details', order_no, created_disctributor_id]);
  }

  verifyOrder(order_no, created_disctributor_id) {
    this.os.verifyOrder(order_no, created_disctributor_id).subscribe(res=>{
      if (res['result']) {
        this.toastr.success('Order verified successfully!');
        this.getOrders();
      } else {
        this.toastr.success(res['message']);
      }
    });
  }

  forwardOrder(order_no, created_disctributor_id) {
    this.os.forwardOrder(order_no, created_disctributor_id).subscribe(res=>{
      if (res['result']) {
        this.toastr.success('Order forwared successfully!');
        this.getOrders();
      } else {
        this.toastr.success(res['message']);
      }
    });
  }

  deleteOrder(order_no, created_disctributor_id) {
    this.os.deleteOrder(order_no, created_disctributor_id).subscribe(res=>{
      if (res['result']) {
        this.toastr.success('Order deleted successfully!');
        this.getOrders();
      } else {
        this.toastr.success(res['message']);
      }
    });
  }

}
