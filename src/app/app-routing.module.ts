import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { CompanyComponent } from './company/company.component';

const routes: Routes = [
  { path: '', component: CompanyComponent },
  { path: 'employee/:id', component: EmployeeComponent }
];

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }