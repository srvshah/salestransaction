import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { MvCustomer } from 'src/app/customer/customer.model';
import { CustomerService } from 'src/app/customer/customer.service';
import { MvProduct } from 'src/app/product/product.model';
import { ProductService } from 'src/app/product/product.service';
import { UtilityService } from 'src/core/services/utility.service';
import { MvSale } from '../sales.model';

@Component({
  selector: 'app-sales-form',
  templateUrl: './sales-form.component.html',
  styleUrls: ['./sales-form.component.scss']
})
export class SalesFormComponent implements OnInit {
  salesForm: FormGroup;
  customers = [];
  products = [];
  action: string;
  sale: MvSale = {} as MvSale;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<SalesFormComponent>,
    private ps: ProductService,
    private cs: CustomerService,
  ) {
    this.action = data.action;
    this.sale = data.data || {};
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {
    this.salesForm = this.fb.group({
      customerId: [this.sale.customerId, Validators.required],
      productId: [this.sale.productId, Validators.required],
      quantity: [this.sale.quantity, Validators.required],
    });
    this.fetchCustomers();
    this.fetchProducts();

  }

  fetchCustomers(): void{
    this.cs.getCustomers().subscribe(res => {
      if (res && res.data){
        res.data.forEach(item => {
          if (item.customerId){
            this.customers.push({
              value: item.customerId,
              viewValue: `${item.firstName} ${item.middleName || ''} ${item.lastName}`
            });
          }
        });
      }
    }, err => console.log(err));
  }

  fetchProducts(): void{
    this.ps.getAllProducts().subscribe(res => {
      if (res && res.data){
        res.data.forEach(item => {
          if (item.productId){
            this.products.push({
              value: item.productId,
              viewValue: item.name
            });
          }
        });
      }
    }, err => console.log(err));
  }

  cancelClick(): void{
    this.dialogRef.close();
  }

  submitForm(): void{
    this.sale.customerId = this.salesForm.get('customerId').value;
    this.sale.productId = this.salesForm.get('productId').value;
    this.sale.quantity = this.salesForm.get('quantity').value;
    this.dialogRef.close(this.sale);
  }

}
