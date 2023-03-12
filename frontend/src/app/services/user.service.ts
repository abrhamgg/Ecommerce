import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/newUser';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = 'http://0.0.0.0:3000/users'
  users = []

  constructor(private http: HttpClient) { }

  postUser(newUser: User) {
    console.log(newUser)
    this.http.post(this.url, newUser).subscribe((res) => {
      console.log(res);
    })
  }

  getUsers() {
    const data = this.http.get(this.url).subscribe((data) => {
      console.log(data)
    })
    return data
  }
}
