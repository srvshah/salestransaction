import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { InvoiceComponent } from './invoice.component';
import { MaterialModule } from '../shared/material.module';

const routes: Routes = [
  {
    path: '',
    component: InvoiceComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ]
})
export class InvoiceModule { }
