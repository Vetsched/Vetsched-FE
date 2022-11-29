import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';

import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { User } from '../models';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
    private router: Router,
    private toaster: ToastrService
  ) {}

  addToast(type = '', title = '', description = ''): void {
    if (type === 'success') {
      this.toaster.success(description, title);
    } else if (type === 'error') {
      this.toaster.error(description, title);
    } else if (type === 'warning') {
      this.toaster.warning(description, title);
    } else if (type === 'info') {
      this.toaster.info(description, title);
    } else {
      this.toaster.info(description, title);
    }
  }
  // Verify JWT in localstorage with server & load user's info.
  // This runs once on application startup.
  populate() {
    // If JWT detected, attempt to get & store user's info
    if (
      localStorage.getItem('profile') !== 'undefined' &&
      localStorage.getItem('profile') !== null
    ) {
      this.setAuth(JSON.parse(String(localStorage.getItem('profile'))));
    } else if (
      this.jwtService.getToken() &&
      typeof this.jwtService.getToken() !== 'undefined'
    ) {
      this.apiService.post('/Identity/AuthPing').subscribe(
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
    // Save JWT sent from server in local storage
    localStorage.setItem('profile', JSON.stringify(user));
    user.token && this.jwtService.saveToken(user.token);
    // Set current user data into observable
    this.currentUserSubject.next(user);
    // Set isAuthenticated to true
    this.isAuthenticatedSubject.next(true);
  }

  setToken(token: string) {
    this.jwtService.saveToken(token);
    this.populate();
  }

  purgeAuth() {
    // Remove JWT from local storage
    this.jwtService.destroyToken();
    localStorage.removeItem('profile');
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

  attemptAuth(type: string, credentials: any): Observable<any> {
    const route = type === 'login' ? '/login' : '';
    return this.apiService.post('/Identity' + route, { ...credentials }).pipe(
      map((response) => {
        if (response.data !== null) {
          this.setAuth({ ...response.data, token: response.token });
          // this.populate();
        }
        return response;
      })
    );
  }

  getCurrentUser(): User {
    return this.currentUserSubject.value;
  }

  // signup call...
  signup(postData: any): Observable<any> {
    return this.apiService.post('/Identity/SignUp', postData);
  }

  // verify email...
  verifyEmail(email: string, emailToken: string): Observable<any> {
    return this.apiService.post('/Identity/ConfirmEmail', {
      email,
      emailToken,
    });
  }

  // get all services...
  getServices(): Observable<any> {
    return this.apiService.get('/api/Service/GetAll');
  }
  // get user profile...
  getUserProfile(profileId: string): Observable<any> {
    return this.apiService.get(
      '/api/UserProfile/Profile?ProfileId=' + profileId
    );
  }
  // update user profile...
  updateProfile(profile: any): Observable<any> {
    return this.apiService.put('/api/UserProfile/Update', profile);
  }
  // save no of pets...
  saveNoOfPets(numberOfPet: number, id: string): Observable<any> {
    return this.apiService.put('/api/UserProfile/Update', { numberOfPet, id });
  }

  // save provider services...
  saveProviderServices(
    serviceIds: string[],
    profileId: string
  ): Observable<any> {
    return this.apiService.post('/api/Service/AddService', {
      serviceIds,
      profileId,
    });
  }

  // get pets....
  getPets(PetLoverId: string): Observable<any> {
    return this.apiService.get('/api/Pet/Pets?PetLoverId=' + PetLoverId);
  }

  // add pet....
  addPet(pet: any, PetId: string): Observable<any> {
    if (PetId !== '') {
      return this.apiService.put('/api/Pet/Update?PetId=' + PetId, {
        ...pet,
        id: PetId,
      });
    } else {
      return this.apiService.post('/api/Pet/Add', pet);
    }
  }

  // remove pet....
  removePet(PetId: string): Observable<any> {
    return this.apiService.delete('/api/Pet/Remove?PetId=' + PetId);
  }

  // get provider services....
  getProviderServices(profileId: string): Observable<any> {
    return this.apiService.get(
      '/api/Service/ProviderServices?ProfileId=' + profileId
    );
  }

  // get requests from pet lovers...
  getRequestsFromPetLovers(profileId: string): Observable<any> {
    return this.apiService.get(
      '/api/UserFriends/Requests?ProfileId=' + profileId
    );
  }

  // get Connected Pet Lovers...
  getConnectedPetLovers(ServiceProviderId: string): Observable<any> {
    return this.apiService.get(
      '/api/UserFriends/ServiceProviders/Added?ServiceProviderId=' +
        ServiceProviderId
    );
  }

  // get Connected Service Providers...
  getConnectedServiceProviders(PetLoverId: string): Observable<any> {
    return this.apiService.get(
      '/api/UserFriends/PetLovers/Added?PetLoverId=' + PetLoverId
    );
  }
  // approve Request...
  approveRequest(params: any): Observable<any> {
    return this.apiService.put('/api/UserFriends/Requests/Accept', params);
  }

  // send Request...
  sendRequest(params: any): Observable<any> {
    return this.apiService.post('/api/UserFriends/Requests/Send', params);
  }

  // reject Request...
  rejectRequest(params: any): Observable<any> {
    return this.apiService.put('/api/UserFriends/Requests/Decline', params);
  }

  // get Service Providers...
  getServiceProviders(): Observable<any> {
    return this.apiService.get('/api/UserFriends/PetLovers/Suggestion');
  }

  // assign pet provider...
  assignPetToProvider(params: any): Observable<any> {
    return this.apiService.post('/api/Pet/Assign', params);
  }

  // remove friend...
  removeFriend(params: any): Observable<any> {
    return this.apiService.delete('/api/UserFriends/Requests/Remove', params);
  }

  // upload picture...
  uploadPicture(params: any): Observable<any> {
    return this.apiService.postFd('/api/UserProfile/Picture/Upload', params);
  }

  // upload pet picture...
  uploadPetPicture(params: any): Observable<any> {
    return this.apiService.postFd('/api/Pet/Picture/Upload', params);
  }

  // add comment...
  addComment(params: any): Observable<any> {
    return this.apiService.post('/api/PetComment/Add', params);
  }

  // get comment...
  getComment(PetId: string, ServiceProviderId: string): Observable<any> {
    return this.apiService.get(
      '/api/PetComment/Get?PetId=' +
        PetId +
        '&ServiceProviderId=' +
        ServiceProviderId
    );
  }
}
