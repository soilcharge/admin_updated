import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DistributorService } from '../../distributor/distributor.service';
import { ReportService } from '../../report/report.service';
@Component({
  selector: 'app-distsalesreport',
  templateUrl: './distsalesreport.component.html',
  styleUrls: ['./distsalesreport.component.css']
})
export class DistsalesreportComponent implements OnInit {
  submitted: boolean = false;
  formContent: FormGroup;
  p: number = 1;
  orders: any = [];
  totalamount: any;
  datefrom: any;
  dateto: any;
  totalorder: any;
  distributordetailsall:any;
  constructor(private distributorService: DistributorService, private os: ReportService, private router: Router, private toastr: ToastrService, private fb: FormBuilder,) { }

  ngOnInit(): void {
    this.getDistOrders();
    this.formContent = new FormGroup({
      created_disctributor_id: new FormControl('', [Validators.required]),
      datefrom: new FormControl('', [Validators.required]),
      dateto: new FormControl('', [Validators.required])
    });

    this.distributorService.getDistributorList().subscribe(distributordetailsall => {
      this.distributordetailsall = distributordetailsall['data'];
    });
  }

  getDistOrders() {
    this.os.getDistOrders(null).subscribe(res => {
      if (res['result']) {
        this.orders = res['data'];
        this.totalamount = res['totalamount'];
        this.totalorder = res['totalorder'];
        this.datefrom = res['datefrom'];
        this.dateto = res['dateto'];
      }
    });
  }

  get f() { return this.formContent.controls; }
  onSubmit() {
    this.submitted = true;
    if (this.formContent.invalid) {
      this.toastr.warning("Select  Proper Data");
      return;
    }


    this.os.getDistOrders(this.formContent.value).subscribe(res => {
      if (res['result']) {
        this.orders = res['data'];
        this.totalamount = res['totalamount'];
        this.totalorder = res['totalorder'];
        this.datefrom = res['datefrom'];
        this.dateto = res['dateto'];
      }
    });
  }
  editOrder(order_no, created_disctributor_id) {
    this.router.navigate(['/admin', 'order-details', order_no, created_disctributor_id]);
  }
}
