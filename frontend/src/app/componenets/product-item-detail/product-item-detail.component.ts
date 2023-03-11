import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.css']
})
export class ProductItemDetailComponent implements OnInit {
  product: Product | undefined;
  id: number | null = 0;
  quantity: number = 0;
  constructor (
    private route: ActivatedRoute,
    private dataService: DataService,
    private cartService: CartService
    ) {}
  ngOnInit(): void {
    this.route.paramMap.forEach((params) => {
      this.id = Number(params.get('id'));

      this.dataService.getData().subscribe((data) => {
        if (this.id) {
          this.product = data[this.id - 1];
        }
      })
    })
  }
  addProductToCart () {
    if (this.quantity > 0 && this.product) {
      let new_product = this.product;
      if (new_product.quantity) {
        new_product.quantity += Number(this.quantity);
      } else {
        new_product.quantity = Number(this.quantity);
      }
      this.cartService.addToCart(new_product);
      alert('Product added to cart');
    } else {
      alert('Product with quantity 0 cannot be added to cart')
    }
  }
}
