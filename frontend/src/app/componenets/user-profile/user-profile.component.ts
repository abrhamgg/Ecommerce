import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/newProduct';
import { UserService } from 'src/app/services/user.service';
import { DataService } from 'src/app/services/data.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  product: Product = {
    name: '',
    price: 0,
    image: '',
    description: ''
  }
  myproduct:Product[] = []
  user = {
    firstname: '',
    lastname: ''
  }
  category: string = ''
  categoryDict = {
    'Books': 1,
    'Clothing': 2,
    'Electronics': 3,
    'Cosmetics': 4,
    'Foods': 5,
    'Gadgets': 6
  }

  constructor (private userService: UserService,
          private dataService: DataService,
          private cartService: CartService
    ) {}
  
    ngOnInit(): void {
        const data = this.userService.getUser()
        console.log(data)
        this.user.firstname = data['firstname']
        this.user.lastname = data['lastname']
        this.getProductByUser().subscribe((data) => {
          this.myproduct = data
        })
        
    }
  
  removeItem(id: string|undefined|number) {
    /*
    this.cartService.removeItem(Number(id)).subscribe((data) => {
      console.log(data)
    })*/
    this.dataService.removeProduct(Number(id)).subscribe((data) => {
      console.log(data)
    })
    window.location.reload()
  }
  addProduct() {
    const user_id = this.userService.getUserId();
    this.product.user_id = user_id;
    this.product.category_id = this.categoryDict[this.category as keyof typeof this.categoryDict ]
    // call to post methods from data service
    this.dataService.addProductToDb(this.product);
  }
  getProductByUser() {
    const user_id = Number(this.userService.getUserId());
    return this.dataService.getProductByUser(user_id);
  }
}
