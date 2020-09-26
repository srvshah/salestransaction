import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MvInvoice, MvInvoiceDetail } from 'src/app/invoice/invoice.model';
import { InvoiceService } from 'src/app/invoice/invoice.service';
import { UtilityService } from 'src/core/services/utility.service';
import { InvoiceDetailComponent } from './invoice-detail/invoice-detail.component';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {

  userMsg: string = null;
  displayedColumns: string[];
  dataSource: MvInvoice[] = [];
  selectedInvoice: MvInvoice = {} as MvInvoice;
  selection = new SelectionModel<MvInvoice>(false, []);
  invoiceDetail: MvInvoiceDetail[] = [];

  constructor(
    private is: InvoiceService,
    private us: UtilityService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.displayedColumns = ['invoiceId', 'invoiceNumber', 'discount', 'customerName', 'transactionCount', 'subtotal', 'total'];
    this.getAllInvoice();
  }

  getAllInvoice(): void{
    this.is.getAllInvoice().subscribe(res => {
      if (res && res.data){
        this.dataSource = res.data;
      } else {
        this.dataSource = [];
        this.userMsg = 'No data';
      }
    }, err => console.log(err));

  }

  onRowClicked(row: any): void{
    this.selectedInvoice = { ...row };
    this.selection.toggle(row);
  }

  getInvoiceDetail(): void{
    if (!this.selection.hasValue()){
      this.us.openSnackBar('Please select an invoice to view details', 'warning');
    }
    else {
      this.is.getInvoiceDetail(this.selectedInvoice.invoiceId).subscribe(res => {
        if (res && res.data){
          this.invoiceDetail = res.data;

          const dialogRef = this.dialog.open(InvoiceDetailComponent, {
            width: '800px',
            height: '500px',
            data: {
              invoice: this.selectedInvoice,
              invoiceDetail: this.invoiceDetail
            }
          });

          dialogRef.afterClosed().subscribe(message => {
            if (message === 'print'){
              this.us.openSnackBar('Invoice Printed Successfully', 'success');
            }
            else if (message === 'close'){
              this.us.openSnackBar('Action Cancelled', 'warning');
            }
          });
        }
      });
    }
  }


}
