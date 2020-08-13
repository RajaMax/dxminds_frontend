import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiEndPoint = 'http://localhost:8000'
  constructor(private http: HttpClient) { }

  getCompanies() {
    return this.http.get(this.apiEndPoint + '/companies');
  }
  createCompany(value:any) {
    return  this.http.post(this.apiEndPoint+'/company',value);
  }
  getEmployees(companyId) {
    return this.http.get(this.apiEndPoint +'/'+companyId +'/employees');
  } 
  createEmployee(value:any) {
    return this.http.post<any>(this.apiEndPoint + '/employee',value);
  }
}
