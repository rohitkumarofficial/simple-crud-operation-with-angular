import { User } from './../types/user';
import { UserRepo } from './../repo/user.repo';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, filter, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _users: Partial<User[]>;
  users$: BehaviorSubject<Partial<User[]>>;
  isLoading$: BehaviorSubject<boolean>;
  constructor(
    private _userRepo: UserRepo
  ) {
    this._users = [];
    this.users$ = new BehaviorSubject<Partial<User[]>>([]);
    this.isLoading$ = new BehaviorSubject(false);
  }

  getAllUsers(): Observable<User[]> {
    this.isLoading$.next(true);
    return this._userRepo.getAllUsers()
      .pipe(
        filter(response => !!response?.length),
        tap(response => {
          this._users = [...this._users, ...response];
          this.isLoading$.next(false);
          this.users$.next(this._users);
        })
      )
  }

  createUser(user: Partial<User>): Observable<User> {
    return this._userRepo.createUser(user)
      .pipe(
        filter(response => !!response?.id),
        tap(({id}) => {
          this._users.unshift({
            ...user,
            id
          } as User)
          this.users$.next(this._users);
        })
      )
  }

  getUser(id: number): Observable<User> {
    return this._userRepo.getUser(id)
   }

  updateUser(user: Partial<User>): Observable<User> {
    return this._userRepo.updateUser(user)
      .pipe(
        filter(response => !!response?.id),
        tap(() => {
          let index = this._users.findIndex(item => item!.id === user.id);
          if (index !== -1) {
            this._users[index]!.username = user.username!;
            this._users[index]!.name = user.name!;
            this._users[index]!.phone = user.phone!;
          }
          this.users$.next(this._users);
        })
      )
  }

  deleteUser(id: number): Observable<User> {
    return this._userRepo.deleteUser(id)
      .pipe(
        tap(() => {
          let index = this._users.findIndex(item => item!.id === id);
          if (index !== -1) {
            this._users.splice(index, 1);
          }
          this.users$.next(this._users);
        })
      )
  }
}
