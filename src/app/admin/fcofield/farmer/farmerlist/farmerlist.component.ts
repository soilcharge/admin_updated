import { Component, OnInit } from '@angular/core';
import { FcofieldService } from '../../fcofield.service';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HelperService } from 'src/app/helper.service';
import { DistributorService } from 'src/app/admin/distributor/distributor.service';
// import { NgLocalization } from '@angular/common';
// import { ResourceLoader } from '@angular/compiler';

declare var $: any;
@Component({
  selector: 'app-farmerlist',
  templateUrl: './farmerlist.component.html',
  styleUrls: ['./farmerlist.component.css'],
})
export class FarmerlistComponent implements OnInit {
  p: number = 1;
  allfarmerlist: any;

  farmerForm: FormGroup;
  allstate: any = [];
  alldist: any = [];
  allcity: any = [];
  alltaluka: any = [];
  formdatanew: any;
  submitted: boolean = false;

  id: any;
  id1: any;
  id2: any;
  id3: any;

  distributordetailsall: any;
  id4: any;
  id5: any;

  constructor(
    public fcofieldService: FcofieldService,
    public router: Router,
    private ngxService: NgxUiLoaderService,
    private toastr: ToastrService,
    private HelperService: HelperService,
    private distributorService: DistributorService
  ) { }

  ngOnInit(): void {
    // $('#pageDataTable').DataTable();
    // console.log(localStorage.getItem('token'));
    this.getFarmerList();

    this.HelperService.getState().subscribe((allstate) => {
      this.allstate = allstate['data'];
      setTimeout(() => {
        let elems = document.querySelectorAll('select');
        let instances = M.FormSelect.init(elems);
      }, 1000);

    });


    this.farmerForm = new FormGroup({
      state: new FormControl('', [Validators.required]),
      district: new FormControl('', [Validators.required]),
      taluka: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      created_disctributor_id: new FormControl('', [Validators.required]),
    });
    this.formControlValueChanges();

    this.distributorService.getDistributorList().subscribe(distributordetailsall => {
      this.distributordetailsall = distributordetailsall['data'];
    });


    // $(document).ready(function () {
    //   setTimeout(() => {
    //     let table = $('#pagedatatable').DataTable({
    //       ordering: true,
    //       lengthChange: true,
    //       showNEntries: false,
    //     })
    //   }, 4000)
    // })

  }

  getFarmerList() {

    var data = {
      state: '',
      district: '',
      taluka: '',
      city: '',
    }

    this.fcofieldService.getFarmerList(data).subscribe((farmerlist) => {
      this.ngxService.start();
      this.allfarmerlist = farmerlist['data'];
      this.ngxService.stop();
    });
  }

  deleteFarmer(id) {
    var obj = {
      user_id: id,
    };

    this.fcofieldService.deleteFarmer(obj).subscribe((res) => {
      if (res['result'] == true) {
        this.toastr.success('Farmer deleted successfully!');
        this.getFarmerList();
      }
    });
  }

  getFarmerForEdit(event) {
    var obj = {
      user_id: event,
    };
    //console.log(obj);
    this.fcofieldService.getFarmerForEdit(obj).subscribe((res) => {
      if (res['result'] == true) {
        this.router.navigate(['/admin', 'farmer-add'], { state: res['data'] });
      }
    });
  }

  getFarmerForView(event) {
    var obj = {
      user_id: event,
    };
    //console.log(obj);
    this.fcofieldService.getFarmerForEdit(obj).subscribe((res) => {
      if (res['result'] == true) {
        this.router.navigate(['/admin', 'farmer-view'], { state: res['data'] });
      }
    });
  }




  ///////////////////////////////////////////////////////////////////////////////////////

  formControlValueChanges() {
    this.farmerForm.get('state').valueChanges.subscribe(val => {
      this.HelperService.getDist({ state_id: val }).subscribe((alldist) => {
        this.alldist = alldist['data'];

        setTimeout(() => {
          let elems = document.querySelectorAll('select');
          let instances = M.FormSelect.init(elems);
        }, 1000);

        this.farmerListdata();

      });
    });

    this.farmerForm.get('district').valueChanges.subscribe(val => {
      this.HelperService.getTaluka({ dist_id: val }).subscribe((alltaluka) => {
        this.alltaluka = alltaluka['data'];
        setTimeout(() => {
          let elems = document.querySelectorAll('select');
          let instances = M.FormSelect.init(elems);
        }, 1000);
        this.farmerListdata();
      });
    });

    this.farmerForm.get('taluka').valueChanges.subscribe(val => {
      this.HelperService.getCity({ taluka_id: val }).subscribe((allcity) => {
        this.allcity = allcity['data'];
        setTimeout(() => {
          let elems = document.querySelectorAll('select');
          let instances = M.FormSelect.init(elems);
        }, 1000);
        this.farmerListdata();
      });
    });








  }

  get f() {
    return this.farmerForm.controls;
  }

  getDataByDist() {
    this.farmerListdata();
  }

  getDataByCity() {
    this.farmerListdata();
  }


  // onSubmit() {
  //   console.log(this.farmerForm.value);
  //   this.formdatanew = this.farmerForm.value;
  //   this.id = this.formdatanew.state;
  //   this.id1 = this.formdatanew.district;
  //   this.id2 = this.formdatanew.taluka;
  //   this.id3 = this.formdatanew.city;

  //   this.router.navigate(['/admin', 'farmerdash-report', this.id, this.id1, this.id2, this.id3]);
  // }


  farmerListdata() {

    this.formdatanew = this.farmerForm.value;
    this.id = this.formdatanew.state;
    this.id1 = this.formdatanew.district;
    this.id2 = this.formdatanew.taluka;
    this.id3 = this.formdatanew.city;
    this.id4 = this.formdatanew.created_disctributor_id;

    var data = {
      state: this.id,
      district: this.id1,
      taluka: this.id2,
      city: this.id3,
      added_by: this.id4

    }
    this.fcofieldService.getFarmerList(data).subscribe(res => {
      if (res['result']) {
        this.allfarmerlist = res['data'];
      }
    });

  }


}
