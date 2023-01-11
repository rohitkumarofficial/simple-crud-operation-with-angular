import { CreateUserComponent } from './user/create-user/create-user.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { ProfileComponent } from './user/profile/profile.component';
import { PageNotFoundComponent } from './layout/page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'user/detail/:id', component: UserDetailComponent },
  { path: 'user/create', component: CreateUserComponent },
  { path: 'user-profile/:id', component: ProfileComponent },
  {path : '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
