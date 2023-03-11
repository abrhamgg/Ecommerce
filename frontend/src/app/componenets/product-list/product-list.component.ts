import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { DataService } from 'src/app/services/data.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products:[] | undefined
  constructor(
    private dataService: DataService,
    private cartService: CartService
    ){}

  ngOnInit(): void {
      this.dataService.getData().subscribe(data => {
        this.products = data
      })
  }

  addProductToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
