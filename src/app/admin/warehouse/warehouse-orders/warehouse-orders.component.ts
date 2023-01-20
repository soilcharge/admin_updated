import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { WarehouseService } from '../warehouse.service';

@Component({
  selector: 'app-warehouse-orders',
  templateUrl: './warehouse-orders.component.html',
  styleUrls: ['./warehouse-orders.component.css']
})
export class WarehouseOrdersComponent implements OnInit {

  p: number = 1;
  orders: any = [];
  constructor(private ws: WarehouseService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    this.ws.getOrders().subscribe(res=>{
      if (res['result']) {
        this.orders = res['data'];
      }
    });
  }

  viewOrder(order_no, created_disctributor_id) {
    this.router.navigate(['/admin', 'warehouse-order-details', order_no, created_disctributor_id]);
  }

  dispatchOrder(order_no, created_disctributor_id) {
    this.ws.dispatchOrder(order_no, created_disctributor_id).subscribe(res=>{
      if (res['result']) {
        this.toastr.success('Order dispatched successfully!');
        this.getOrders();
      } else {
        this.toastr.success(res['message']);
      }
    });
  }

}
