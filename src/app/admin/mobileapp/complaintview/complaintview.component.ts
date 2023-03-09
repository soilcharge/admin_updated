import { Component, OnInit } from '@angular/core';
import { MobileappService } from "./../mobileapp.service";
import {Router} from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-complaintview',
  templateUrl: './complaintview.component.html',
  styleUrls: ['./complaintview.component.css']
})
export class ComplaintviewComponent implements OnInit {
  
    alllist:any;
    p:number = 1;
    constructor(public mobileappService:MobileappService,public router:Router) { }
  
    ngOnInit(): void {
      this.mobileappService.getMobileAppHetMessegesList().subscribe(list => {
        this.alllist = list['data'];
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
  
  