import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Product } from 'src/app/models/newProduct';
import { DataService } from 'src/app/services/data.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnChanges {
  products:[] | Product[] | undefined
  filter: string = ''
  searchBody: string = ''
  categoryDict = {
    'Books': 1,
    'Clothing': 2,
    'Electronics': 3,
    'Cosmetics': 4,
    'Foods': 5,
    'Gadgets': 6
  }
  constructor(
    private dataService: DataService,
    private cartService: CartService
    ){}

  ngOnInit(): void {
    /*
    if (userService.isLoggedOut()) {
      this.router.navigate(["/login"]);
    }*/
      /*
      this.dataService.getData().subscribe(data => {
        this.products = data
        console.log(this.products)
      })*/
      this.getDataFromDb().subscribe((data) => {
          this.products = data;
      })
  }
  ngOnChanges(changes: SimpleChanges): void {
      
  }
  /*
  addProductToCart(product: Product) {
    this.cartService.addToCart(product);
  }*/

  getDataFromDb() {
    return this.dataService.getDataFromDb();
  }
  onFilter() {
    if (this.filter != '0' && this.filter != ''){
      console.log(this.filter)
      this.dataService.getProductByCategory(Number(this.filter)).subscribe((data) => {
        this.products = data
      })
    } else {
      this.getDataFromDb().subscribe((data) => {
        this.products = data;
    })
    }
  }
  sendTheNewValue(event:any) {
    this.searchBody = event.target.value
    if (this.searchBody !== '') {
      this.products = this.products?.filter((pro) => {
        console.log(pro.name)
        console.log(this.searchBody)
        console.log(pro.name?.includes(this.searchBody))
        return pro.name?.includes(this.searchBody)
      })
    } else {
      this.getDataFromDb().subscribe((data) => {
        this.products = data;
    })
    }
    console.log(this.searchBody)
  }
  onSearch() {
    if (this.searchBody !== '') {
      this.products = this.products?.filter((pro) => {
        console.log(pro.name)
        console.log(this.searchBody)
        console.log(pro.name?.includes(this.searchBody))
        return pro.name?.includes(this.searchBody)
      })
    } else {
      this.getDataFromDb().subscribe((data) => {
        this.products = data;
    })
    }
  }
}
