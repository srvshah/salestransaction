import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDetailComponent } from './user-detail.component';
import { UserDetailService } from './user-detail.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [UserDetailComponent],
  providers: [UserDetailService]
})
export class UserDetailModule { }
