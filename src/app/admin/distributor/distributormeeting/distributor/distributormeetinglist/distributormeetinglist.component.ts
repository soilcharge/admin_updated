import { Component, OnInit } from '@angular/core';
import { DistributorService } from "../../../distributor.service";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
declare var $: any;
@Component({
  selector: 'app-distributormeetinglist',
  templateUrl: './distributormeetinglist.component.html',
  styleUrls: ['./distributormeetinglist.component.css']
})
export class DistributormeetinglistComponent implements OnInit {
  p:number=1;
  alllist: any;
  constructor(public distributorService: DistributorService, 
    public router: Router,
    private toastr: ToastrService
    ) { }

  ngOnInit(): void {
    this.distributorService.getDistributorMeetingList().subscribe(list => {
      //this.alllist = list['data'];
      if(list['result']==true)
      {
        this.alllist = list['data'];
      }

      if(list['error']==true)
      {
        this.toastr.error("Something went wrong "+list['message']);
      }
    });


    
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

}
