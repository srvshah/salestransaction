import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UtilityService } from 'src/core/services/utility.service';
import { SalesService } from './sales.service';
import { MvSale } from './sales.model';
import { SalesFormComponent } from './sales-form/sales-form.component';
import { InvoiceService } from '../invoice/invoice.service';

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
  selectionCheckBox = new SelectionModel<MvSale>(true, []);


  constructor(
    private ss: SalesService,
    private dialog: MatDialog,
    private us: UtilityService,
    private is: InvoiceService
  ) { }

  ngOnInit(): void {
    this.displayedColumns = ['select', 'salesTransactionId', 'productName', 'customerName', 'quantity', 'rate', 'invoiceId', 'amount'];
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
    this.selectionCheckBox.toggle(row);
  }

  isAllSelected(): boolean {
    const numSelected = this.selectionCheckBox.selected.length;
    const numRows = this.dataSource.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle(): void {
    this.isAllSelected() ?
        this.selectionCheckBox.clear() :
        this.dataSource.forEach(row => this.selectionCheckBox.select(row));
  }

  generateInvoice(): void{
    if (!this.selectionCheckBox.hasValue()){
      this.us.openSnackBar('Select sales to generate invoice', 'warning');
    }
    else {
      if (this.isInvoiced(this.selectionCheckBox.selected)){
        this.us.openSnackBar('Cannot generate invoice for an invoiced sale', 'warning');
      }
      else if (!this.hasSameCustomer(this.selectionCheckBox.selected)){
        this.us.openSnackBar('Please select sales with same customer', 'warning');
      }
      else {
        this.is.generateInvoice(this.selectionCheckBox.selected).subscribe(res => {
          this.us.openSnackBar('Invoice Generated', 'success');
          this.getAllSales();
        }, err => console.log(err));
      }
    }
  }

  hasSameCustomer(array): boolean {
    const first = array[0];
    return array.every((element) => {
        return element.customerId === first.customerId;
    });
  }

  isInvoiced(array): boolean{
    let res = false;
    array.forEach(item => {
      if (item.invoiceId){
        res = true;
        return;
      }
    });
    return res;
  }
}
