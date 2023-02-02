import { Component, OnInit } from '@angular/core';
import { DistributorService } from "../../../distributor.service";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HelperService } from 'src/app/helper.service';
declare var $: any;
@Component({
  selector: 'app-farmermeetinglist',
  templateUrl: './farmermeetinglist.component.html',
  styleUrls: ['./farmermeetinglist.component.css']
})
export class FarmermeetinglistComponent implements OnInit {
  p: number = 1;
  alllist: any;
  allstate: any = [];
  alldist: any = [];
  allcity: any = [];
  alltaluka: any = [];
  formdatanew: any;
  farmerForm: FormGroup;
  id: any;
  id1: any;
  id2: any;
  id3: any;
  id4: any;
  data: any = '';
  constructor(public distributorService: DistributorService,
    public router: Router,
    private toastr: ToastrService,
    private HelperService: HelperService) { }

  ngOnInit(): void {
    this.distributorService.getFarmerMeetingList(this.data).subscribe(list => {
      if (list['result'] == true) {
        this.alllist = list['data'];
      }

      if (list['error'] == true) {
        this.toastr.error("Something went wrong " + list['message']);
      }
    });


    this.farmerForm = new FormGroup({
      state: new FormControl('', [Validators.required]),
      district: new FormControl('', [Validators.required]),
      taluka: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      created_disctributor_id: new FormControl('', [Validators.required]),
    });
    this.formControlValueChanges();



    // $(document).ready(function () {
    //   setTimeout(() => {
    //     let table = $('#pagedatatable').DataTable({
    //       ordering: true,
    //       lengthChange: false,
    //       showNEntries: false,
    //     })
    //   }, 4000)
    // })

    $(document).ready(function () {
      setTimeout(() => {
        let table = $('#pagedatatable').DataTable({
          ordering: true,
          lengthChange: false,
          showNEntries: false,

          dom: 'Bfrtip',
          buttons: [
            //'copy', 'csv', 'excel', 'pdf', 'print'
            //*
            'excel', 'pdf'
            //'excel', 'pdf'
          ]


        })
      }, 4000)
    })


    this.HelperService.getState().subscribe((allstate) => {
      this.allstate = allstate['data'];
      setTimeout(() => {
        let elems = document.querySelectorAll('select');
        let instances = M.FormSelect.init(elems);
      }, 1000);

    });


  }

  formControlValueChanges() {
    this.farmerForm.get('state').valueChanges.subscribe(val => {
      this.HelperService.getDist({ state_id: val }).subscribe((alldist) => {
        this.alldist = alldist['data'];

        setTimeout(() => {
          let elems = document.querySelectorAll('select');
          let instances = M.FormSelect.init(elems);
        }, 1000);

        this.getFarmerMeetingListdata();

      });
    });

    this.farmerForm.get('district').valueChanges.subscribe(val => {
      this.HelperService.getTaluka({ dist_id: val }).subscribe((alltaluka) => {
        this.alltaluka = alltaluka['data'];
        setTimeout(() => {
          let elems = document.querySelectorAll('select');
          let instances = M.FormSelect.init(elems);
        }, 1000);
        this.getFarmerMeetingListdata();
      });
    });

    this.farmerForm.get('taluka').valueChanges.subscribe(val => {
      this.HelperService.getCity({ taluka_id: val }).subscribe((allcity) => {
        this.allcity = allcity['data'];
        setTimeout(() => {
          let elems = document.querySelectorAll('select');
          let instances = M.FormSelect.init(elems);
        }, 1000);
        this.getFarmerMeetingListdata();
      });
    });
  }


  getFarmerMeetingListdata() {

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
      added_by: this.id4,
    }

    this.distributorService.getFarmerMeetingList(data).subscribe(list => {
      if (list['result'] == true) {
        this.alllist = list['data'];
      }

      if (list['error'] == true) {
        this.toastr.error("Something went wrong " + list['message']);
      }
    });

  }



}
