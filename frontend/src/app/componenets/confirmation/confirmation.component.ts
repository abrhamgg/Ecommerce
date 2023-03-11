import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

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
    private router: Router
  ) {}
  ngOnInit(): void {
      this.name = this.cartService.getUser().fullName
      this.price = this.cartService.getTotalCost()
  }
  goHome() {
    this.cartService.clearCart()
  }
}
