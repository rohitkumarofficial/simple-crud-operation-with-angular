import { RouterModule } from '@angular/router';
import { SharedModule } from './../_config/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { CreateUserComponent } from './create-user/create-user.component';



@NgModule({
  declarations: [
    ProfileComponent,
    UserDetailComponent,
    CreateUserComponent
  ],
  exports: [ProfileComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ]
})
export class UserModule { }
