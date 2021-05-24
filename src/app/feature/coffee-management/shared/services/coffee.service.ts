import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { environment } from 'src/environments/environment';
import { CreateCoffee } from '../model/create-coffee';
import { ResponseCoffee } from '../model/response-coffee';
import { UpdateCoffee } from '../model/edit-coffee';
import { BaseCoffeeService } from '@shared/services/base-coffee.service';

@Injectable()
export class CoffeeService extends BaseCoffeeService {

  constructor(protected http: HttpService) {
    super(http);
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
