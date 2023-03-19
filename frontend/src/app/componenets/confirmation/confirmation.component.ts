import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {
  price: number = 0;
  name: string = ''
  constructor (
    private cartService: CartService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {/*
      this.name = this.cartService.getUser().fullName
      this.price = this.cartService.getTotalCost()*/
      this.cartService.getTotalCost(this.userService.getUserId()).subscribe((data)=> {
        this.price = data.totalcost
      })
  }
  goHome() {
    /*this.cartService.clearCart()*/
  }
}
