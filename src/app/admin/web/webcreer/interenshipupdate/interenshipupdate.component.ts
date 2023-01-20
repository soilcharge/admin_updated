import { Component, OnInit } from '@angular/core'
import { WebService } from '../../web.service'
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'
import { HttpClient } from '@angular/common/http'
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Params,
  Router,
} from '@angular/router'
import { Location } from '@angular/common'
import { ToastrService } from 'ngx-toastr'
import * as M from 'materialize-css/dist/js/materialize'
declare var $: any
@Component({
  selector: 'app-interenshipupdate',
  templateUrl: './interenshipupdate.component.html',
  styleUrls: ['./interenshipupdate.component.css'],
})
export class InterenshipupdateComponent implements OnInit {
  submitted: boolean = false
  formContent: FormGroup
  allstate: any
  editdata: any

  constructor(
    public WebService: WebService,
    public http: HttpClient,
    private fb: FormBuilder,
    public router: Router,
    private location: Location,
    private toastr: ToastrService,
    private route: ActivatedRoute,
  ) {}
  ngOnInit(): void {
    this.editdata = history.state

    this.formContent = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      mobile: new FormControl('', [Validators.required]),
      qualification: new FormControl('', [Validators.required]),

      datafor: new FormControl('0'),
      id: new FormControl('0'),
    })

    this.route.params.subscribe((params: Params) => {
      this.editdata = +this.route.snapshot.params['id']
    })
    if (this.editdata) {
      var obj = { id: this.editdata }
      this.WebService.webEntrenshipEdit(obj).subscribe((res) => {
        if (res['result'] == true) {
          this.formContent.patchValue({
            name: res['data'][0].name,
            email: res['data'][0].email,
            address: res['data'][0].address,
            mobile: res['data'][0].mobile,
            qualification: res['data'][0].qualification,
            datafor: 1,
            id: res['data'][0].id,
          })
          setTimeout(() => {
            M.updateTextFields()
          }, 1000)
        }
      })
    }
  }

  get f() {
    return this.formContent.controls
  }

  onSubmit() {
    this.submitted = true
    if (this.formContent.invalid) {
      this.toastr.warning('Details missing!')
      return
    }

    if (this.formContent.value.datafor == 1) {
      this.WebService.webEntrenshipUpdate(this.formContent.value).subscribe(
        (res) => {
          if (res['result'] == true) {
            this.toastr.success('Information updated successfully!')
            this.router.navigate(['/admin', 'webcareerinternship-list'])
          } else {
            this.toastr.success(res['message'])
            this.router.navigate(['/admin', 'webcareerinternship-list'])
          }
        },
      )
    }
  }
}
