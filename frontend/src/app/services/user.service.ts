import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/newUser';
import jwtDecode from 'jwt-decode';
import { Router } from '@angular/router';
import * as moment from 'moment';
import decode_jwt from '../utils/decode-jwt';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = 'http://0.0.0.0:3000/'
  url = 'http://0.0.0.0:3000/users'
  users = []
  logged_name = ''

  constructor(
    private http: HttpClient,
    private router: Router,
    ) { }

  postUser(newUser: User) {
    console.log(newUser)
    this.http.post(this.url, newUser).subscribe((res) => {
      console.log(res);
      if (Object.values(res)[0] === 'invalid request parameters') {
        alert('please fill out all the required forms')
      } else if (Object.values(res)[0] === 'User Exists. Please use a different username') {
        alert('User already exists.')
      } else {
        alert('Account Created!')
        this.router.navigate(["/login"]);
      }
    })
  }

  getUsers() {
    const data = this.http.get(this.url).subscribe((data) => {
      console.log(data)
    })
    return data
  }

  login(username: string, password: string) {
    console.log("Logging in")
    const body = {
      username: `${username}`,
      password: `${password}`
    }
    
    this.http.post(this.baseUrl + 'login', body).subscribe((res) => {
      if (Object.values(res)[0] === 'invalid request parameters') {
        alert('please fill out all the required forms')
      }
      console.log(res)
      if (Object.values(res)[0] === 'Authentication failed') {
        alert('Invalid username or password')
      }
      const decoded:any = decode_jwt(String(res))
      console.log(decoded['user'])
      console.log(decoded)
      this.logged_name = decoded['user']['username']
      this.setSession(res)
      this.router.navigate(["/products"])
    })
    /*
    this.http.get(this.baseUrl + 'api').subscribe((data) => {
      console.log(data)
      this.router.navigate(["/products"])
    })*/
  }

  private setSession(authResult:any) {
    const expiresAt = moment().add(60, 'minute');
    //console.log(authResult)
    localStorage.setItem('id_token', authResult)
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
    
  }

  deleteSession() {
    localStorage.removeItem('id_token')
    localStorage.removeItem('expires_at')
  }

  public isLoggedIn():boolean {
    return moment().isBefore(this.getExpiration())
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration:any = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
}
  getName() {
    if (this.isLoggedIn()) {
      const token = localStorage.getItem('id_token')
      const decoded:any = decode_jwt(String(token))
      return decoded['user']['username']
    }
    return 'Guest';
  }

  getUserId() {
    if (this.isLoggedIn()) {
      const token = localStorage.getItem('id_token')
      const decoded:any = decode_jwt(String(token))
      return decoded['user']['id']
    }
  }
}
