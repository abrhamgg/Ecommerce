import { Component } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
 constructor(private user: UserService) {}
 name = this.user.getName()
 isLoggedIn() {
  return !this.user.isLoggedIn();
 }

 removeSession() {
  this.user.deleteSession()
 }
}
