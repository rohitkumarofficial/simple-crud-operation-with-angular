import { UserService } from 'src/services/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, Observable, switchMap, tap } from 'rxjs';
import { User } from 'src/types/user';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  userInfo$: Observable<User>;
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _userService: UserService,
  ) {

  }
  ngOnInit(): void {
    this.userInfo$ = this._activatedRoute.params
      .pipe(
        filter(params => !!params && params['id']),
        switchMap(params => this._userService.getUser(params['id']))
      )
  }
}
