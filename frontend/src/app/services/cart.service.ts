import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { User } from '../models/user';
import { CartItem } from '../models/cartItem';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/order';
import { Router } from '@angular/router';

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
  private baseUrl = 'http://0.0.0.0:3000/cartItem'
  constructor(private http: HttpClient,
              private router: Router
    ) { }

  addToCartItems(cartItem: CartItem) {
    this.http.post(this.baseUrl, cartItem).subscribe((res) => {
      if (Object.values(res)[0] === 'product added to cart') {
        alert('product added to cart')
      } else {
        alert('Please fill out required forms');
      }
    })
  }

  getCartItems(): Observable<CartItem[]>{
    return this.http.get<CartItem[]>(this.baseUrl)
  }

  getTotalCost(user_id:number): Observable<any>{
    const url = `http://localhost:3000/cartItem/${user_id}/total`
    return this.http.get(url)
  }

  removeItem(item_id: number) {
    const url = `http://localhost:3000/cartItem/${item_id}`
    return this.http.delete(url)
  }

  updateItem(item: CartItem) {
    return this.http.patch(this.baseUrl, item)
  }
  clearCart() {
    return this.http.delete(this.baseUrl)
  }
  completeCart(order: Order) {
    const url = `http://localhost:3000/orders`
    return this.http.post(url, order).subscribe((data) => {
      if (Object.values(data)[0] !== 'cart has been checked out') {
        console.log(Object.values(data)[0])
        alert('something went wrong. please try again')
      } else{
        this.clearCart().subscribe((data)=> {
          console.log(this.cartItems)
        })
        
        alert('Order accepted')
        this.router.navigate(["/confirmation"])
      }
    })
  }
  /*
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
  }*/
}
