import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
  },
  {
    path: 'user-detail',
    loadChildren: () => import('./user-detail/user-detail.module').then(m => m.UserDetailModule),
  },
  {
    path: 'product',
    loadChildren: () => import('./product/product.module').then(m => m.ProductModule),
  },
  {
    path: 'customer',
    loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule)
  },
  {
    path: 'sales',
    loadChildren: () => import('./sales/sales.module').then(m => m.SalesModule)
  },
  {
    path: 'invoice',
    loadChildren: () => import('./invoice/invoice.module').then(m => m.InvoiceModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
