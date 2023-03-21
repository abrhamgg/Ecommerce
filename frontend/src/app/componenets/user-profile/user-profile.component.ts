import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/newProduct';
import { UserService } from 'src/app/services/user.service';
import { DataService } from 'src/app/services/data.service';

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
          private dataService: DataService
    ) {}
  
    ngOnInit(): void {
        const data = this.userService.getUser()
        console.log(data)
        this.user.firstname = data['firstname']
        this.user.lastname = data['lastname']
    }

  addProduct() {
    const user_id = this.userService.getUserId();
    this.product.user_id = user_id;
    this.product.category_id = this.categoryDict[this.category as keyof typeof this.categoryDict ]
    // call to post methods from data service
    this.dataService.addProductToDb(this.product);
  }
}
