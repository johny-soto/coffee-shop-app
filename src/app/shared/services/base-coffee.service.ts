import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { GetCoffee } from '@shared/model/get-coffee';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BaseCoffeeService {

  constructor(protected http: HttpService) { }

  public getAll() {
    return this.http.doGet<GetCoffee[]>(`${environment.endpoint}/coffees`, this.http.optsName('Listar Cafés'));
  }
}
