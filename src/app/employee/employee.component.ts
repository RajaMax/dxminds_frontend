import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  myForm: FormGroup;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
  ) { }
  employess = [];
  companyId: any
  apiEndpoint=this.api.apiEndPoint
  ngOnInit() {
    this.companyId = this.route.snapshot.paramMap.get('id');
    this.myForm = new FormGroup({
      company_id:new FormControl(this.companyId),
      profile: new FormControl(''),
      name: new FormControl("", [
        Validators.required,
      ]),
      address: new FormControl("", [
        Validators.required,
      ]),
      phone_number: new FormControl("", [
        Validators.required,
      ]),
    })
   
    this.getEmployees();
  }
  get name() { return this.myForm.get('name'); }
  get address() { return this.myForm.get('address'); }
  get phone_number() { return this.myForm.get('phone_number'); }

  onSubmit(form: FormGroup) {
    console.log('Valid?', form.valid); // true or false
    console.log('Name', form.value.name);
    console.log('Email', form.value.address);
    console.log('Message', form.value.type);
    console.log(form.value)
    console.log(form)
    const formData = new FormData();
    formData.append('profile', this.myForm.get('profile').value);
    formData.append('name', this.myForm.get('name').value);
    formData.append('address', this.myForm.get('address').value);
    formData.append('phone_number', this.myForm.get('phone_number').value);
    formData.append('company_id', this.companyId);

    this.api.createEmployee(formData).subscribe((res: any) => {
      this.getEmployees();
    });
  }
  getEmployees() {
    this.api.getEmployees(this.companyId).subscribe((res: any) => {
      this.employess = res
    });
  }
  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.myForm.get('profile').setValue(file);
    }
  }
}
