import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../shared/models/User';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { GET_ALL_USERS_URL, UPDATE_USER_PASSWORD_URL, UPDATE_USER_URL, USER_LOGIN_URL, USER_REGISTER_URL } from '../shared/constants/urls';
import { IUserRegister } from '../shared/interfaces/IUserRegister';
import { IUserProfile } from '../shared/interfaces/IUserProfile';
import { IUserPassword } from '../shared/interfaces/IUserPassword';

const USER_KEY = 'User';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage());
  public userObservable: Observable<User>;
  constructor(private http: HttpClient, private toastrService: ToastrService) {
    this.userObservable = this.userSubject.asObservable();
  }

  public get currentUser(): User {
    return this.userSubject.value;
  }

  login(userLogin: IUserLogin): Observable<User> {
    return this.http.post<User>(USER_LOGIN_URL, userLogin).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(
            `Welcome to Food Order Website ${user.name}!`,
            'Login Successful'
          )
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Login Failed');
        }
      })
    );
  }

  register(userRegiser: IUserRegister): Observable<User> {
    return this.http.post<User>(USER_REGISTER_URL, userRegiser).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(
            `Welcome to the Food Order Website ${user.name}`,
            'Register Successful'
          )
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error,
            'Register Failed')
        }
      })
    )
  }


  logout() {
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY);
    window.location.reload();
  }

  private setUserToLocalStorage(user: User) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  private getUserFromLocalStorage(): User {
    const userJson = localStorage.getItem(USER_KEY);
    if (userJson) return JSON.parse(userJson) as User;
    return new User();
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(GET_ALL_USERS_URL)
  }

  updateUserProfile(userProfile: IUserProfile): Observable<User> {
    return this.http.put<User>(UPDATE_USER_URL, userProfile).pipe(
      tap({
        next: (user) => {

          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(
            `${user.name} User Profile Updated `,
            'Profile Update Successful'
          )
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error,
            'Profile Update Failed')
        }
      })
    );
  }

  updateUserPassword(userPassword: IUserPassword) {
    return this.http.put<User>(UPDATE_USER_PASSWORD_URL, userPassword).pipe(
      tap({
        next: (user) => {
          this.toastrService.success(
            `${user.name} User Password Updated `,
            'Password Update Successful'
          )
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error,
            'Password Update Failed')
        }
      })
    );
  }

}
