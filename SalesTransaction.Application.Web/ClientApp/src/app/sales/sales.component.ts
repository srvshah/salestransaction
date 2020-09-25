import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UtilityService } from 'src/core/services/utility.service';
import { SalesService } from './sales.service';
import { MvSale } from './sales.model';
import { SalesFormComponent } from './sales-form/sales-form.component';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {
  userMsg: string = null;
  displayedColumns: string[];
  dataSource: MvSale[] = [];
  selectedSale: MvSale = {} as MvSale;
  selection = new SelectionModel<MvSale>(false, []);

  constructor(
    private ss: SalesService,
    private dialog: MatDialog,
    private us: UtilityService
  ) { }

  ngOnInit(): void {
    this.displayedColumns = ['salesTransactionId', 'productName', 'customerName', 'quantity', 'rate', 'invoiceId', 'amount'];
    this.getAllSales();
  }

  getAllSales(): void{
    this.ss.getAllSales().subscribe(res => {
      if (res && res.data){
        this.dataSource = res.data;
      } else {
        this.dataSource = [];
        this.userMsg = 'No data';
      }
    }, err => console.log(err));
  }

  addSales(): void{
    this.selection.clear();
    this.selectedSale = {} as MvSale;
    this.openDialog('Add');
  }
  editSales(): void{
    this.openDialog('Edit');
  }

  openDialog(action: string): void{
    if (action === 'Edit' && !this.selection.hasValue()){
      this.us.openSnackBar('Select a sale before editing', 'warning');
      return;
    }
    const dialogRef = this.dialog.open(SalesFormComponent, {
     data: {
       action,
       data: this.selectedSale
     }

    });

    dialogRef.afterClosed().subscribe(sale => {
      if (sale){
        if (action === 'Edit'){
          this.ss.updateSale(sale).subscribe(res => {
            this.getAllSales();
            this.us.openSnackBar('Sale Updated', 'success');
          });
        }
        else {
          this.ss.addSale(sale).subscribe(res => {
            this.getAllSales();
            this.us.openSnackBar('Sale Added', 'success');
          }, err => console.log(err));
        }
      }
    });
  }

  onRowClicked(row: any): void{
    this.selectedSale = { ...row };
    this.selection.toggle(row);
  }
}
