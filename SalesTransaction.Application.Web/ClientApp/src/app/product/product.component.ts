import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import {MvProduct} from './product.model';
import { MatDialog } from '@angular/material/dialog';
import { ProductFormComponent } from './product-form/product-form.component';
import { SelectionModel } from '@angular/cdk/collections';
import {UtilityService} from './../../core/services/utility.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  userMsg: string = null;
  displayedColumns: string[];
  dataSource: MvProduct[] = [];
  selectedProduct: MvProduct = {} as MvProduct;
  selection = new SelectionModel<MvProduct>(false, []);

  constructor(
    private productService: ProductService,
    private dialog: MatDialog,
    private us: UtilityService
  ) {
  }

  ngOnInit(): void {
    this.displayedColumns = ['productId', 'name', 'description', 'stock'];
    this.getAllProducts();
  }

  getAllProducts(): void{
    this.productService.getAllProducts().subscribe(res => {
      if (res && res.data){
        this.dataSource = res.data;
      } else {
        this.dataSource = [];
        this.userMsg = 'No data';
      }
    }, err => console.log(err));
  }

  addProduct(): void{
    this.selection.clear();
    this.selectedProduct = {} as MvProduct;
    this.openDialog('Add');
  }

  editProduct(): void{
    this.openDialog('Edit');
  }

  openDialog(action: string): void{
    if (action === 'Edit' && !this.selection.hasValue()){
      this.us.openSnackBar('Select a product before editing', 'warning');
      return;
    }
    const dialogRef = this.dialog.open(ProductFormComponent, {
     data: {
       action,
       data: this.selectedProduct
     }

    });

    dialogRef.afterClosed().subscribe(product => {
      if (product){
        if (action === 'Edit'){
          this.productService.updateProduct(product).subscribe(res => {
            this.getAllProducts();
            this.us.openSnackBar('Product Updated', 'success');
          });
        }
        this.productService.addProduct(product).subscribe(res => {
          this.getAllProducts();
          this.us.openSnackBar('Product Added', 'success');
        }, err => console.log(err));

      }
    });
  }

  onRowClicked(row: any): void{
    this.selectedProduct = { ...row };
    this.selection.toggle(row);
  }

}
