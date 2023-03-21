import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css', "./assets/css/Login-Form-Basic-icons.css", "./assets/bootstrap/css/bootstrap.min.css"]
})
export class UserLoginComponent {
  username: string = ''
  password: string = ''
  constructor (private userService: UserService) {}

  login() {
    this.userService.login(this.username, this.password);
  }
}
