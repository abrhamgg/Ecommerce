import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Product } from 'src/app/models/product';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { CartItem } from 'src/app/models/cartItem';
import { UserService } from 'src/app/services/user.service';
import { Order } from 'src/app/models/order';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  constructor (
    private cartService: CartService,
    private router: Router,
    private userService: UserService
  ) {}

  cartItems: CartItem[] = []
  total = 0;
  quantity = 0;
  user: User = {
    fullName: '',
    address: '',
    creditCard: ''
  }
  order: Order = {
    total: this.total
  }
  ngOnInit(): void {
      /*this.cart = this.cartService.getCart()*/
      this.getCartItems().subscribe((data) => {
        this.cartItems = data
        console.log(data);
      })
      this.getTotalCost().subscribe((data) => {
        this.total = data.totalcost
        this.order.total = data.totalcost
      })
      /*

      this.total = this.cartService.getTotalCost();
      this.user = this.cartService.getUser();*/
  }

  getCartItems() {
    return this.cartService.getCartItems()
  }

  getTotalCost() {
    const user_id = this.userService.getUserId()
    return this.cartService.getTotalCost(Number(user_id))
  }
  removeItem(id: string | number) {
    this.cartService.removeItem(Number(id)).subscribe((data) => {
      console.log(data)
    })
    /*
    this.getCartItems().subscribe((data) => {
      this.cartItems = data
    })
    this.getTotalCost().subscribe((data) => {
      this.total = data.totalcost
    })*/
    this.router.navigate(["/products"])
  }
  clearCart() {
    if (this.cartItems.length !== 0) {
      this.cartService.clearCart().subscribe((data) => {
        console.log(data)
      })
      this.getCartItems().subscribe((data) => {
        this.cartItems = data
      })
      this.router.navigate(["/products"])
    }
  }

  completeCart() {
    if (this.cartItems.length !== 0) {
      this.cartService.completeCart(this.order)
      /*this.total = 0*/
    }
  }
  updateQuantity(item: CartItem, id: string | number, quantity:number | string) {
    console.log(quantity)
    if (quantity == 0) {
      this.cartService.removeItem(Number(id)).subscribe((data) => {
        console.log(data)
      })
      this.getCartItems().subscribe((data) => {
        this.cartItems = data
      })
      this.getTotalCost().subscribe((data) => {
        this.total = data.totalcost
      })
      //remove item from cart_items
      //update cartitems
    } else {/*
      console.log('updating')
      // CREATE UPDATE METHOD IN THE BACKEND
      
      this.cartService.updateItem(item)

      this.getCartItems().subscribe((data) => {
        this.cartItems = data
      })
      this.getTotalCost().subscribe((data) => {
        this.total = data.totalcost
      })*/
      //update cart_items
      // update total cost
    }
  }
  /*
  updateQuantity(id: number, quantity: number | string) {
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
  }*/
}
