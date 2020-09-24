import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MvCustomer } from '../customer.model';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent implements OnInit {
  custForm: FormGroup;
  action: string;
  customer: MvCustomer = {} as MvCustomer;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CustomerFormComponent>
  ) {
    this.action = data.action;
    this.customer = data.data || {};
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {
    this.custForm = this.fb.group({
      firstName: [this.customer.firstName, Validators.required],
      middleName: [this.customer.middleName],
      lastName: [this.customer.lastName, Validators.required]
    });
  }

  cancelClick(): void {
    this.dialogRef.close();
  }

  submitForm(): void {
    this.customer.firstName = this.custForm.get('firstName').value.trim();
    this.customer.middleName = this.custForm.get('middleName').value ? this.custForm.get('middleName').value.trim() : null;
    this.customer.lastName = this.custForm.get('lastName').value.trim();
    this.dialogRef.close(this.customer);
  }

}
