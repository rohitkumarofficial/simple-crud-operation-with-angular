import { HomeModule } from './../home/home.module';
import { LayoutModule } from './../layout/layout.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './shared.module';
import { HttpClientModule } from '@angular/common/http';
import { UserModule } from '../user/user.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    SharedModule,
    HttpClientModule,
    LayoutModule,
    UserModule,
    HomeModule,
  ]
})
export class CoreModule { }
