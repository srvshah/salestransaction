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
    if (this.action === 'Add'){
      this.prodForm = this.fb.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        stock: ['', Validators.required],
        rate: ['', Validators.required],
        startDate: ['', Validators.required],
        endDate: ['', Validators.required]
      });
    }else {
      this.prodForm = this.fb.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        stock: ['', Validators.required]
      });
    }
  }

  cancelClick(): void {
    this.dialogRef.close();
  }

  submitForm(): void {
    this.dialogRef.close(this.product);
  }

}
