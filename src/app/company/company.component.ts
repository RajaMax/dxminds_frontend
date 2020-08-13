import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  myForm: FormGroup;
  companyData: any
  constructor(
    private api: ApiService
  ) { }

  ngOnInit() {
    this.myForm = new FormGroup({
      name: new FormControl("", [
        Validators.required,
      ]),
      address: new FormControl("", [
        Validators.required,
      ]),
      type: new FormControl("", [
        Validators.required,
      ]),
    })
    this.getCompanies()
   
  }
  get name() { return this.myForm.get('name'); }
  get address() { return this.myForm.get('address'); }
  get type() { return this.myForm.get('type'); }

  getCompanies(){
    this.api.getCompanies().subscribe((res: any) => {
      if (res.length > 0) {
        this.companyData = res[0];
      }
    });
  }

  onSubmit(form: FormGroup) {
    console.log('Valid?', form.valid); // true or false
    console.log('Name', form.value.name);
    console.log('Email', form.value.address);
    console.log('Message', form.value.type);
    this.api.createCompany(form.value).subscribe((res: any) => {
      this.getCompanies();
    });
  }
  
}
