import { Component, OnInit } from '@angular/core';
import { DistributorService } from "../../distributor.service";
import {Router} from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-distributortargetvideolist',
  templateUrl: './distributortargetvideolist.component.html',
  styleUrls: ['./distributortargetvideolist.component.css']
})
export class DistributortargetvideolistComponent implements OnInit {
  p:number=1;
  alllist: any;
  constructor(public distributorService: DistributorService, public router: Router) { }

  ngOnInit() {
    this.distributorService.getDistributorVideoList().subscribe(list => {
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

  delete(id) {
    var obj = {
      video_id: id
    };

    this.distributorService.deleteDistirbutorVideoById(obj).subscribe(res => {
      if (res['result'] == true) {
        this.router.navigate(['/admin', 'distributorvideo-list']);
      }
    });
  }

  getForEdit(event) {
    var obj = {
      video_id: event
    };
    this.distributorService.getByDistirbutorVideoIdForEdit(obj).subscribe(res => {
      if (res['result'] == true) {
        this.router.navigate(['/admin', 'distributorvideo-add'],{state: res['data']});
      }
    });
  }


}
