import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { filter, tap } from 'rxjs';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent {
  createUserForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(2)]),
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(2)]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(2)]),
    phone: new FormControl(null, [Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
  })

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _snackbar: MatSnackBar,
  ) {

  }

  create() {
    const { username, firstName, lastName, phone } = this.createUserForm.value;
    this._userService.createUser({
      username: username!,
      name: {
        firstname: firstName!,
        lastname: lastName!
      },
      phone: phone!,
    })
      .pipe(
        filter(response => !!response.id),
        tap(() => {
          this._snackbar.open('User created successfully', '', {
            duration: 500
          });
        }),
      )
      .subscribe(
        (response) => {
          if (response?.id) {
            this._router.navigate(['/home']);
          }
        }
      )
  }
}
