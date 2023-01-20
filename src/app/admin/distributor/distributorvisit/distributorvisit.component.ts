import { Component, OnInit } from '@angular/core';
import { DistributorService } from "../distributor.service";
import {Router} from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-distributorvisit',
  templateUrl: './distributorvisit.component.html',
  styleUrls: ['./distributorvisit.component.css']
})
export class DistributorvisitComponent implements OnInit {

  alllist:any;
  p:number = 1;
  constructor(public distributorService:DistributorService,public router:Router) { }

  ngOnInit(): void {
    this.distributorService.getVisitList().subscribe(list => {
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
