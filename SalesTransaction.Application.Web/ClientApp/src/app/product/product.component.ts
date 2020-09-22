import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import {MvProduct} from './product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  userMsg: string = null;
  displayedColumns: string[];
  dataSource: MvProduct[] = [];

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.displayedColumns = ['productId', 'name', 'description', 'rate'];

    this.getAllProducts();
  }

  getAllProducts(): void{
    this.userMsg = null;
    this.productService.getAllProducts().subscribe(res => {
      if (res && res.data){
        this.dataSource = res.data;
      } else {
        this.dataSource = [];
        this.userMsg = 'No data';
      }
    }, err => console.log(err));
  }

}
