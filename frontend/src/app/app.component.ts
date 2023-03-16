import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'my-store';
  showHeader: boolean = false;

  constructor(private router: Router,
              private userService: UserService
    ) {
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (event['url'] == '/login' || event['url'] == '/register' || event['url'] === '/') {
          this.showHeader = false;
        } else {
          this.showHeader = true
        }
      }
    })
  }
  ngOnInit(): void {
    // If user isnot logged in it will redirect the user to login page
    if (this.userService.isLoggedOut()) {
      this.router.navigate(["/login"]);
    }
  }
}
