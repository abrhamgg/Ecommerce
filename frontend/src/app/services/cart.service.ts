import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: Product[] = [];
  private totalCost: number = 0;
  private user: User = {
    fullName: '',
    address: '',
    creditCard: '',
  }
  constructor() { }

  addToCart(item: Product) {
    //check if product already exist in cart Items
    const item_index = this.cartItems.findIndex((cartItem) => {
      return cartItem.id === item.id
    })
    if (item_index !== -1) {
      this.cartItems[item_index].quantity! += item.quantity!;
      return;
    } else {
      this.cartItems.push(item)
    }
    console.log(this.cartItems)
  }

  getCart() {
    return this.cartItems;
  }

  removeItemFromCart(id: number) {
    this.cartItems = this.cartItems.filter((item) => {
      return item.id !== id;
    })
  }

  getTotalCost() {
    this.totalCost = 0;
    for (let item of this.cartItems) {
      if (item.quantity) {
        this.totalCost += item.price * item.quantity;
      }
    }
    return Number(this.totalCost.toFixed(2))
  }

  getUser() {
    return this.user;
  }

  clearCart() {
    this.cartItems = []
  }
}
