import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Product } from 'src/app/models/product';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  constructor (
    private cartService: CartService,
    private router: Router
  ) {}

  cart: Product[] = []
  total = 0;
  quantity = 0;
  user: User = {
    fullName: '',
    address: '',
    creditCard: ''
  }
  ngOnInit(): void {
      this.cart = this.cartService.getCart()
      this.total = this.cartService.getTotalCost();
      this.user = this.cartService.getUser();
  }
  updateQuantity(id: number, quantity: number | undefined) {
    if (quantity === 0) {
      alert('Produc removed from cart');
      this.cartService.removeItemFromCart(id);
      this.cart = this.cartService.getCart();
    }
    this.total = this.cartService.getTotalCost();
  }

  submitOrder() {
    const pattern = /^\d+\.?\d*$/;
    if (this.user.address.length < 3) {
      alert('invalid address')
    }
    else if (this.user.fullName.length < 6) {
      alert('invalid name')
    }
    else if (this.user.creditCard.length < 16) {
      alert('invalid credit card')
    }
    else if (pattern.test(this.user.creditCard) === false) {
      alert('credit card should only contain numbers')
    }
    else if (this.total === 0) {
      alert('Cart is empty')
    }
    else {
      this.router.navigate(["/confirmation"])
    }
  }
}
