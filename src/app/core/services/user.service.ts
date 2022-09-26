import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';

import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { User } from '../models';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class UserService {
  private currentUserSubject = new BehaviorSubject<User>({} as User);
  public currentUser = this.currentUserSubject
    .asObservable()
    .pipe(distinctUntilChanged());

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  private isAdminSubject = new ReplaySubject<boolean>(1);
  public isAdmin = this.isAdminSubject.asObservable();

  constructor(
    private apiService: ApiService,
    private http: HttpClient,
    private jwtService: JwtService,
    private router: Router
  ) {}

  // Verify JWT in localstorage with server & load user's info.
  // This runs once on application startup.
  populate() {
    // If JWT detected, attempt to get & store user's info
    if (
      this.jwtService.getToken() ||
      typeof this.jwtService.getToken !== 'undefined'
    ) {
      this.apiService.get('/user').subscribe(
        (data) => this.setAuth(data.user),
        (err) => this.purgeAuth()
      );
    } else {
      // Remove any potential remnants of previous auth states
      this.purgeAuth();
    }
  }

  Membersquery(config: any): Observable<{ members: []; membersCount: number }> {
    // Convert any filters over to Angular's URLSearchParams
    const params: any = {};

    Object.keys(config.filters).forEach((key) => {
      params[key] = config.filters[key];
    });

    return this.apiService.get(
      '/members',
      new HttpParams({ fromObject: params })
    );
  }

  GroupUsersquery(config: any): Observable<{ users: [] }> {
    // Convert any filters over to Angular's URLSearchParams
    const params: any = {};
    Object.keys(config.filters1).forEach((key) => {
      params[key] = config.filters1[key];
    });

    return this.apiService.get(
      '/forum_chat_group/finduser',
      new HttpParams({ fromObject: params })
    );
  }

  setAuth(user: User) {
    // Save JWT sent from server in localstorage
    console.log(user, 'user');
    this.jwtService.saveToken(user.token);
    // Set current user data into observable
    this.currentUserSubject.next(user);
    // Set isAuthenticated to true
    this.isAuthenticatedSubject.next(true);
  }

  purgeAuth() {
    // Remove JWT from localstorage
    this.jwtService.destroyToken();
    // Set current user to an empty object
    this.currentUserSubject.next({} as User);
    // Set auth status to false
    this.isAuthenticatedSubject.next(false);
    // Set Admin to false
    this.isAdminSubject.next(false);
    if (window.location.href.match('/account') != null) {
      this.router.navigateByUrl('/login');
    }
  }

  attemptAuth(type: string, credentials: any): Observable<User> {
    const route = type === 'login' ? '/login' : '';
    return this.apiService.post('/users' + route, { user: credentials }).pipe(
      map((data) => {
        console.log(data, 'fsdafdsfds');
        this.setAuth(data.user);
        return data;
      })
    );
  }

  getCurrentUser(): User {
    return this.currentUserSubject.value;
  }
}
