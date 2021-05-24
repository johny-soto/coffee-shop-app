import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { environment } from 'src/environments/environment';
import { Currecy } from '../model/currency';

@Injectable()
export class CurrecyService {

  constructor(protected http: HttpService) { }

  public getTrmUSDToCOP() {
    const url = `https://free.currconv.com/api${environment.currencyEndpoint}/convert?q=USD_COP&compact=ultra&apiKey=${environment.crrencyApiKey}`;
    return this.http.doGet<Currecy>(url);


    // return this.http.doGet<any>(`${environment.currencyEndpoint}/convert?q=USD_COP&compact=ultra&apiKey=${environment.crrencyApiKey}`);
  }
}
