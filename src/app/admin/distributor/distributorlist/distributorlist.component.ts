import { Component, OnInit } from '@angular/core';
import { DistributorService } from "../distributor.service";
import {Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
declare var $:any;
@Component({
  selector: 'app-distributorlist',
  templateUrl: './distributorlist.component.html',
  styleUrls: ['./distributorlist.component.css']
})
export class DistributorlistComponent implements OnInit {
  p:number=1;
  alllist:any = [];
  constructor(public distributorService:DistributorService,
    public router:Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getDistributors();

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

  getDistributors() {
    this.distributorService.getDistributorList().subscribe(list => {
      if(list['result']==true) {
        this.alllist = list['data'];
      }
    });
  }

  delete(id) {
    var obj = {
      id: id
    };

    this.distributorService.deleteById(obj).subscribe(res=>{
      if (res['result']== true) {
        this.getDistributors();
      }
     });
  }

  getForEdit(event) {
    var obj = {
      id: event
    };

    this.distributorService.getByIdForEdit(obj).subscribe(res=>{
      if (res['result']== true) {
        this.router.navigate(['/admin','distributor-add'], { state: res['data'] });
      }
     });
  }

  getForView(event) {
    var obj = {
      id: event
    };

    this.distributorService.getByIdForEdit(obj).subscribe(res=>{
      if (res['result']== true) {
        this.router.navigate(['/admin','distributor-view'], { state: res['data'] });
      }
     });
  }


  setStatus(event, id) {
    var obj = {
      id: id
    };
    if (event.target.checked) {
      this.distributorService.unblockDistributor(obj).subscribe(res=>{
        if (res['result']) {
          this.toastr.success('Distributor unblocked successfully!');
        } else {
          this.toastr.error(res['message']);
        }
      });
    } else {
      this.distributorService.blockDistributor(obj).subscribe(res=>{
        if (res['result']) {
          this.toastr.success('Distributor blocked successfully!');
        } else {
          this.toastr.error(res['message']);
        }
      });
    }
  }


  

  setUserPramotion(event, user_id,user_type) {
    var obj = {
      user_id: user_id,
      user_type:user_type
    };
      this.distributorService.promoteDistributor(obj).subscribe(res=>{
        if (res['result']) {
          this.toastr.success('Distributor promoted successfully!');
          if (res['result']==true)
          {
            // setInterval(function(){
              this.getDistributors();
            // }, 5000);

          }
          
        } else {
          this.toastr.error(res['message']);
        }
      });

      
 
  }

  demoteDistributor(event, user_id) {
    var obj = {
      user_id: user_id
    };
      this.distributorService.demoteDistributor(obj).subscribe(res=>{
        if (res['result']) {
          this.toastr.success('Distributor demoted successfully!');
          if (res['result']==true)
          {
            // setInterval(function(){
                this.getDistributors();
            // }, 8000);
          }
         
        } else {
          this.toastr.error(res['message']);
        }
      });

     
 
  }

  showComplaints(id) {
    this.router.navigate(['/admin', 'distributor-complaints', id]);
  }

  showMessages(id) {
    this.router.navigate(['/admin', 'distributor-messages', id]);
  }


}
