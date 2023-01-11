import { User } from './../../../types/user';
import { UserService } from './../../../services/user.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, filter, switchMap, Observable, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  userForm = new FormGroup({
    id: new FormControl(),
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(2)]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(2)]),
    phone: new FormControl('', [Validators.required]),
  })

  subscription: Subscription;

  userInfo$: Observable<User>;

  _userInfo: Partial<User>;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _userService: UserService,
    private _snackbar: MatSnackBar,
    private _router: Router
  ) {
    this.subscription = new Subscription();
  }
  ngOnInit(): void {
    this.userInfo$ = this._activatedRoute.params
      .pipe(
        filter(params => !!params && params['id']),
        switchMap(params => this._userService.getUser(params['id'])),
        filter(response => !!response),
        tap(response => {
          this._userInfo = response;
          this.userForm.patchValue({
            firstName: response.name.firstname,
            lastName: response.name.lastname,
            phone: response.phone,
            id: response.id
          })
        })
      )

  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  update() {
    this.subscription.add(
      this._userService.updateUser({
        id: this.userForm.value.id,
        ...this._userInfo,
        name: {
          firstname: this.userForm.value.firstName,
          lastname: this.userForm.value.lastName
        },
        phone: this.userForm.value.phone
      } as User).subscribe(
        () => {
          this._snackbar.open('Profile updated successfully', '', {
            duration: 500
          });
          this._router.navigate(['/home']);
        }
      )
    )
  }

  deleteAcc() {
    this.subscription.add(
      this._userService.deleteUser(this.userForm.value.id)
      .subscribe(
        () => {
          this._snackbar.open('Account deleted successfully', '', {
            duration: 500
          });
          this._router.navigate(['/home']);
        }
      )
    )
  }
}
