import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { DataService } from '../services/data.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css',"assets/bootstrap/css/bootstrap.min.css", "assets/css/Navbar-Right-Links-Dark-icons.css"]
})
export class HeaderComponent implements OnInit {
 constructor(private user: UserService, private dataService: DataService, private cartService: CartService) {}
 name = this.user.getName()
 user_id = this.user.getUserId()
 total = 0.00
 searchItem = ''
 isLoggedIn() {
  return !this.user.isLoggedIn();
 }

 ngOnInit(): void {
  this.cartService.getTotalCost(this.user_id).subscribe((data) => {
    this.total = data.totalcost
  })
 }

 removeSession() {
  this.user.deleteSession()
 }
 onSearch() {
  this.dataService.searchBody = this.searchItem
  console.log(this.searchItem);
 }
}
