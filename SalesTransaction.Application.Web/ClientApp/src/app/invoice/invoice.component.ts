import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MvInvoice } from 'src/app/invoice/invoice.model';
import { InvoiceService } from 'src/app/invoice/invoice.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {

  userMsg: string = null;
  displayedColumns: string[];
  dataSource: MvInvoice[] = [];
  selectedSale: MvInvoice = {} as MvInvoice;
  selection = new SelectionModel<MvInvoice>(false, []);

  constructor(
    private is: InvoiceService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.displayedColumns = ['invoiceId', 'invoiceNumber', 'discount', 'customerName', 'transactionCount', 'subtotal', 'total'];
    this.getAllInvoice();
  }

  getAllInvoice(): void{
    this.is.getAllInvoice().subscribe(res => {
      console.log(res)
      if (res && res.data){
        this.dataSource = res.data;
      } else {
        this.dataSource = [];
        this.userMsg = 'No data';
      }
    }, err => console.log(err));

  }
}
