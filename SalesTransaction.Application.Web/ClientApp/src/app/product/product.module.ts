import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from './product.service';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { MaterialModule } from '../shared/material.module';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {path: '', component: ProductComponent}
];

@NgModule({
  declarations: [ProductFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ],
  providers: [ProductService]
})
export class ProductModule { }
