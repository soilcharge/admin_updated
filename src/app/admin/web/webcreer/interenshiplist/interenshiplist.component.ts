import { Component, OnInit } from '@angular/core';
import { WebService } from "../../web.service";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
declare let $: any;
@Component({
  selector: 'app-interenshiplist',
  templateUrl: './interenshiplist.component.html',
  styleUrls: ['./interenshiplist.component.css']
})
export class InterenshiplistComponent implements OnInit {
  p: number = 1;
  alllist: any = [];
  editid: any;
  constructor(public webService: WebService,
    public router: Router,
    private toastr: ToastrService,
    private ngxService: NgxUiLoaderService
  ) { }

  ngOnInit(): void {
    this.ngxService.start();
    this.webService.webEntrenshipList().subscribe(datalist => {
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
        this.router.navigate(['/admin', 'redirectself'], { state: ['/admin', 'webcareerinternship-list'] });
      }
      if (res['error'] == true) {
        this.toastr.error("Something went wrong " + res['message']);
      }
    });
    this.ngxService.stop();
  }

  getForEdit(event) {
    this.editid = event;
    this.router.navigate(['/admin', 'webcareerinternship-view', this.editid]);
  }

  getForUpdate(event) {
    this.editid = event;
    this.router.navigate(['/admin', 'webcareerinternship-update', this.editid]);
  }
}

