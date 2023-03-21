import { Component } from '@angular/core';
import { User } from 'src/app/models/newUser';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css', "assets/bootstrap/css/bootstrap.min.css", "assets/css/styles.css"]
})
export class UserRegistrationComponent {
  constructor (private userService: UserService) {}
  user: User = {
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: ''
  }
  onRegister() {
    console.log('sending request')
    /*console.log(this.userService.getUsers())*/
    console.log(this.userService.postUser(this.user))
  }
}
