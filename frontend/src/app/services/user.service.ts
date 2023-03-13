import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/newUser';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = 'http://0.0.0.0:3000/'
  url = 'http://0.0.0.0:3000/users'
  users = []

  constructor(
    private http: HttpClient,
    private router: Router
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
    const body = {
      username: `${username}`,
      password: `${password}`
    }
    this.http.post(this.baseUrl + 'login', body).subscribe((res) => {
      if (Object.values(res)[0] === 'invalid request parameters') {
        alert('please fill out all the required forms')
      }
      console.log(res);
    })
  }
}
