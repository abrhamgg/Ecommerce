import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/models/product';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-proudct-item',
  templateUrl: './proudct-item.component.html',
  styleUrls: ['./proudct-item.component.css']
})
export class ProudctItemComponent {
  @Input() product: Product | undefined;
  @Output() new_product_emitter = new EventEmitter();

  quantity: number = 0;
  getProducts() {
    /*TODO*/
  }
  log () {
    console.log(this.quantity);
  }
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
  }
}
