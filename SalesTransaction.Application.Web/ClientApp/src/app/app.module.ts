import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { MaterialModule } from './shared/material.module'
import { HttpClientModule } from '@angular/common/http';
import { ProductComponent } from './product/product.component';
import { CustomerComponent } from './customer/customer.component';
import { SalesComponent } from './sales/sales.component';
import { InvoiceComponent } from './invoice/invoice.component';

@NgModule({
  declarations: [
    AppComponent,
    UserDetailComponent,
    ProductComponent,
    CustomerComponent,
    SalesComponent,
    InvoiceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
