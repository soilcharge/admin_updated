import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ReportService } from '../../report/report.service';
@Component({
  selector: 'app-ordernotdispatched',
  templateUrl: './ordernotdispatched.component.html',
  styleUrls: ['./ordernotdispatched.component.css']
})
export class OrdernotdispatchedComponent implements OnInit {
  submitted: boolean = false;
  formContent: FormGroup;
  p: number = 1;
  orders: any = [];
  totalamount: any;
  datefrom: any;
  dateto: any;
  totalorder: any;
  constructor(private os: ReportService, private router: Router, private toastr: ToastrService, private fb: FormBuilder,) { }

  ngOnInit(): void {
    this.getOrderNotDispatched();
    this.formContent = new FormGroup({
      datefrom: new FormControl('', [Validators.required]),
      dateto: new FormControl('', [Validators.required])
    });
  }

  getOrderNotDispatched() {
    this.os.getOrderNotDispatched(null).subscribe(res => {
      if (res['result']) {
        this.orders = res['data'];
        this.totalamount = res['totalamount'];
        this.datefrom = res['datefrom'];
        this.dateto = res['dateto'];
        this.totalorder = res['totalorder'];
      }
    });
  }

  get f() { return this.formContent.controls; }
  onSubmit() {
    this.submitted = true;
    if (this.formContent.invalid) {
      this.toastr.warning("Select Date");
      return;
    }


    this.os.getOrderNotDispatched(this.formContent.value).subscribe(res => {
      if (res['result']) {
        this.orders = res['data'];
        this.totalamount = res['totalamount'];
        this.datefrom = res['datefrom'];
        this.dateto = res['dateto'];
        this.totalorder = res['totalorder'];
      }
    });
  }

  editOrder(order_no, created_disctributor_id) {
    this.router.navigate(['/admin', 'order-details', order_no, created_disctributor_id]);
  }

}
