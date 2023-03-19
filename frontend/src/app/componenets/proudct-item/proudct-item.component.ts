import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItem } from 'src/app/models/cartItem';
import { Product } from 'src/app/models/newProduct';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-proudct-item',
  templateUrl: './proudct-item.component.html',
  styleUrls: ['./proudct-item.component.css']
})
export class ProudctItemComponent {
  @Input() product: Product | undefined;
  @Output() new_product_emitter = new EventEmitter();

  quantity: number = 0;
  constructor(private userService: UserService,
              private cartService: CartService 
    ) {}
  getProducts() {
    /*TODO*/
  }
  log () {
    console.log(this.product)
    console.log(this.quantity);
  }
  addToCart() {
    if (this.quantity > 0 && this.product) {

      let cartItem: CartItem = {
        user_id: this.userService.getUserId(),
        product_id: Number(this.product.id),
        quantity: this.quantity,
        price: Number(this.product.price),
        status: 'active'
      }
      this.cartService.addToCartItems(cartItem)
    } else{
      alert('Check your quantity')
    }
  }
  /*
  addToCart() {
    if (this.quantity > 0 && this.product) {
      let new_product = this.product;
      if (new_product.quantity) {
        new_product.quantity += Number(this.quantity);
      } else {
        new_product.quantity = Number(this.quantity);
      }
      this.new_product_emitter.emit(new_product);
      alert('product added to cart')
    } else {
      alert('Product with 0  quantity cannot be added cart');
    }
  }*/
}
