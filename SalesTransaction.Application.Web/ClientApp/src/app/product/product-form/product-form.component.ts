import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MvProduct } from '../product.model';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit{
  prodForm: FormGroup;
  prodCreateForm: FormGroup;
  prodEditForm: FormGroup;
  action: string;
  product: MvProduct = {} as MvProduct;


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ProductFormComponent>
  ) {
    this.action = data.action;
    this.product = data.data || {};
    dialogRef.disableClose = true;
  }


  ngOnInit(): void {
    this.prodCreateForm = this.fb.group({
      name: [this.product.name, Validators.required],
      description: [this.product.description, Validators.required],
      stock: [this.product.stock, Validators.required],
      rate: [this.product.rate, Validators.required],
      startDate: [this.product.startDate, Validators.required],
      endDate: [this.product.endDate, Validators.required]
    });

    this.prodEditForm = this.fb.group({
      name: [this.product.name, Validators.required],
      description: [this.product.description, Validators.required],
      stock: [this.product.stock, Validators.required]
    });

    if (this.action === 'Add'){
      this.prodForm = this.prodCreateForm;
    }else {
      this.prodForm = this.prodEditForm;
    }
  }

  cancelClick(): void {
    this.dialogRef.close();
  }

  submitForm(): void {
    if (this.action === 'Add'){
      this.product.name = this.prodCreateForm.get('name').value.trim();
      this.product.description = this.prodCreateForm.get('description').value.trim();
      this.product.stock = this.prodCreateForm.get('stock').value;
      this.product.rate = this.prodCreateForm.get('rate').value;
      this.product.startDate = this.prodCreateForm.get('startDate').value;
      this.product.endDate = this.prodCreateForm.get('endDate').value;
    }
    else if (this.action === 'Edit')
    {
      this.product.name = this.prodEditForm.get('name').value.trim();
      this.product.description = this.prodEditForm.get('description').value.trim();
      this.product.stock = this.prodEditForm.get('stock').value;
    }

    this.dialogRef.close(this.product);
  }

}
