import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailComponent } from './user-detail.component';

const routes: Routes = [
  {
    path: ':id',
    component: UserDetailComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class UserDetailModule { }
