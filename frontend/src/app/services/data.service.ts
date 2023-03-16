import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Product } from '../models/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  baseUrl = 'http://0.0.0.0:3000/products'

  constructor(private http: HttpClient) { }

  getData(): Observable<[]> {
    return this.http.get<[]>("../../assets/data.json")
  }

  getDataFromDb(): any {
    this.http.get<[]>(this.baseUrl).subscribe((data) => {
      console.log(data)
    })
  }
}
