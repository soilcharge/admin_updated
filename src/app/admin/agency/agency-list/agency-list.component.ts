import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AgencyService } from '../agency.service';
declare let $: any;
@Component({
  selector: 'app-agency-list',
  templateUrl: './agency-list.component.html',
  styleUrls: ['./agency-list.component.css']
})
export class AgencyListComponent implements OnInit {

  p: number = 1;
  allagencylist:any = [];

  constructor(
    private as: AgencyService,
    private ngxService: NgxUiLoaderService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getAgencyList();

    $(document).ready(function () {
      setTimeout(() => {
        let table = $('#pagedatatable').DataTable({
          ordering: true,
          lengthChange: false,
          showNEntries: false,
        })
      }, 4000)
    })

    
  }

  getAgencyList() {
    this.as.getAgencyList().subscribe(res=>{
      if (res['result']) {
        this.ngxService.start();
        this.allagencylist = res['data'];
        this.ngxService.stop();
      }

    });
  }

  editAgency(id) {
    this.router.navigate(['/admin', 'edit-agency', id]);
  }

  deleteAgency(id) {
    let ans = window.confirm('Do you really want to delete this agency?');
    if (ans) {
      this.as.deleteAgency(id).subscribe(res=>{
        if (res['result']) {
          this.toastr.success('Agency deleted successfully!');
          this.getAgencyList();
        } else {
          this.toastr.error(res['message']);
        }
      });
    }
  }

}
