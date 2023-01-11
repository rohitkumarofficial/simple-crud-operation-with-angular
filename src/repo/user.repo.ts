import { Observable } from 'rxjs';
import { User } from './../types/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserRepo {

  baseUrl = 'https://fakestoreapi.com';

  constructor(
    private _http: HttpClient
  ) { }

  getAllUsers(): Observable<User[]> {
    return this._http.get<User[]>(
      [
        this.baseUrl,
        'users'
      ].join('/')
    )
  }

  createUser(user: Partial<User>): Observable<User> {
    return this._http.post<User>(
      [
        this.baseUrl,
        'users'
      ].join('/'),
      user);
  }

  getUser(id: number): Observable<User> {
    return this._http.get<User>(
      [
        this.baseUrl,
        'users',
        id
      ].join('/'));
  }

  updateUser(user: Partial<User>): Observable<User> {
    return this._http.put<User>(
      [
        this.baseUrl,
        'users',
        user.id
      ].join('/'), user);
  }

  deleteUser(id: number): Observable<User> {
    return this._http.delete<User>(
      [
        this.baseUrl,
        'users',
        id
      ].join('/'));
  }
}
