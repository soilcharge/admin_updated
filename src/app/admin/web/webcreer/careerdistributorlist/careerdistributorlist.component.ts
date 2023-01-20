import { Component, OnInit } from '@angular/core';
import { WebService } from "../../web.service";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DistributorService } from "../../../distributor/distributor.service";
declare let $: any;
@Component({
  selector: 'app-careerdistributorlist',
  templateUrl: './careerdistributorlist.component.html',
  styleUrls: ['./careerdistributorlist.component.css']
})
export class CareerdistributorlistComponent implements OnInit {
  p: number = 1;
  alllist: any = [];
  editid: any;
  constructor(public webService: WebService,
    public router: Router,
    private toastr: ToastrService,
    private ngxService: NgxUiLoaderService,
    public distributorService:DistributorService
  ) { }

  ngOnInit(): void {
    this.ngxService.start();
    this.webService.webCareerDistList().subscribe(datalist => {
      if (datalist['result'] == true) {
        this.alllist = datalist['data'];
      }
    });
    this.ngxService.stop();

    $(document).ready(function () {
      setTimeout(() => {
        let table = $('#pagedatatable').DataTable({
          ordering: true,
          lengthChange: false,
          showNEntries: false,

          dom: 'Bfrtip',
          buttons: [
            //'copy', 'csv', 'excel', 'pdf', 'print'
            'excel', 'pdf'
          ]          
        })
      }, 4000)
    })
    
  }


  deleteItem(id) {
    var obj = {
      id: id
    };
    this.ngxService.start();
    this.webService.webVideoDelete(obj).subscribe(res => {
      if (res['result'] == true) {
        this.toastr.success("Video deleted successfully!");
        this.router.navigate(['/admin', 'redirectself'], { state: ['/admin', 'webvideo-list'] });
      }
      if (res['error'] == true) {
        this.toastr.error("Something went wrong " + res['message']);
      }
    });
    this.ngxService.stop();
  }

  getForView(event) {
    var obj = {
      id: event
    };

    this.distributorService.webFrontGetByIdForEdit(obj).subscribe(res=>{
      if (res['result']== true) {
        this.router.navigate(['/admin','webcareerdist-view'], { state: res['data'] });
      }
     });


  }

  getForUpdate(event) {

    var obj = {
      id: event
    };

    this.distributorService.webFrontGetByIdForEdit(obj).subscribe(res=>{
      if (res['result']== true) {
        this.router.navigate(['/admin','webcareerdist-update'], { state: res['data'] });
      }
     });
  }
}

