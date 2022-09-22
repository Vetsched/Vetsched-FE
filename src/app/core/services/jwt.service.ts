import { Injectable } from '@angular/core';


@Injectable()
export class JwtService {

//   getToken(): String {
//     if(typeof window.localStorage['jwtToken'] == 'undefined'){
//       return '';
//     }
//     return window.localStorage['jwtToken'];
//   }

//   saveToken(token: String) {
//     window.localStorage['jwtToken'] = token;
//   }

//   destroyToken() {
//     window.localStorage.removeItem('jwtToken');
//   }



  getToken() {
    return localStorage.getItem('jwtToken');
  }

  saveToken(token:string) {
    // window.localStorage['jwtToken'] = token;
    localStorage.setItem('jwtToken', token);
  }

  destroyToken() {
    localStorage.removeItem('jwtToken');
  }

}