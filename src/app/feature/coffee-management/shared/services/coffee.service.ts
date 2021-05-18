import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { environment } from 'src/environments/environment';
import { CreateCoffee } from '../model/create-coffee';
import { GetCoffee } from '../model/get-coffee';
import { ResponseCoffee } from '../model/response-coffee';
import { UpdateCoffee } from '../model/edit-coffee';

@Injectable({
  providedIn: 'root'
})
export class CoffeeService {

  constructor(protected http: HttpService) {
  }

  public getAll() {
    return this.http.doGet<GetCoffee[]>(`${environment.endpoint}/coffees`, this.http.optsName('Listar Cafés'));
  }

  public save(coffee: CreateCoffee) {
    return this.http.doPost<CreateCoffee, ResponseCoffee>(`${environment.endpoint}/coffees`, coffee,
     this.http.optsName('Crear café'));
  }

  public update(coffee: UpdateCoffee) {
    return this.http.doPut<UpdateCoffee, void>(`${environment.endpoint}/coffees/${coffee.id}`, coffee,
     this.http.optsName('Crear café'));
  }

  public delete(coffeeId: number) {
    return this.http.doDelete<void>(`${environment.endpoint}/coffees/${coffeeId}`, this.http.optsName('Crear café'));
  }
}
