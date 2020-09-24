import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './../shared/material.module';
import { CustomerFormComponent } from './customer-form/customer-form.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerComponent
  }
];

@NgModule({
  declarations: [CustomerFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ]
})
export class CustomerModule { }
