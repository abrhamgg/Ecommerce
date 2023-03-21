import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Product
 } from '../models/newProduct';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  baseUrl = 'http://0.0.0.0:3000/products'
  searchBody = ''
  totalCost = 0

  constructor(private http: HttpClient) { }

  getData(): Observable<[]> {
    return this.http.get<[]>("../../assets/data.json")
  }

  getDataFromDb(): Observable<[]> {
    return this.http.get<[]>(this.baseUrl)
  }

  getSingleProduct(id: number): Observable<Product> {
    return this.http.get<Product>(this.baseUrl + `/${id}`)
  }
  getProductByCategory(category_id: number): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl + `/category/${category_id}`)
  }
  addProductToDb(newProduct: Product) {
    this.http.post(this.baseUrl, newProduct).subscribe((res) => {
      console.log(res)
      if (Object.values(res)[0] === 'product created') {
        alert('product created')
      } else {
        alert('Please fill out required forms');
      }
    })
  }
}
