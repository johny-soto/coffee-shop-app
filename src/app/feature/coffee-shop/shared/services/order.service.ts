import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { environment } from 'src/environments/environment';
import { CreateOrder } from '../model/create-order';
import { OrderSummary } from '../model/order-summary';

@Injectable()
export class OrderService {

  constructor(protected http: HttpService) { }

  public create(order: CreateOrder) {
    return this.http.doPost<CreateOrder, OrderSummary>(`${environment.endpoint}/orders`, order,
      this.http.optsName('Crear pedido'));
  }

  public place(order: any) {
    return this.http.doPut<any, void>(`${environment.endpoint}/orders`, order,
      this.http.optsName('Realizar pedido'));
  }
}
