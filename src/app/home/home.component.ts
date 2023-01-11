import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from './../../services/user.service';
import { User } from './../../types/user';
import { Observable, Subscription } from 'rxjs';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  userInfo$: Observable<Partial<User> | null>;
  users$: Observable<Partial<User[]>>;
  subscription: Subscription;
  isLoading$: Observable<boolean>;
  constructor(
    private _userService: UserService,
    private _snackbar: MatSnackBar
  ) {
    this.isLoading$ = this._userService.isLoading$;
    this.subscription = new Subscription();
    this.users$ = this._userService.users$;
    this._userService.getAllUsers().subscribe();
  }


  deleteAcc(id: number) {
    this.subscription.add(
      this._userService.deleteUser(id)
        .subscribe(
          () => {
            this._snackbar.open('Account deleted successfully', '', {
              duration: 500
            });
          }
        )
    )
  }
}
