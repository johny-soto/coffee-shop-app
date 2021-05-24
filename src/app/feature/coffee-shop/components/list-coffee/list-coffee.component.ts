import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GetCoffee } from '@shared/model/get-coffee';
import { BaseCoffeeService } from '@shared/services/base-coffee.service';
import { CreateOrder } from '../../shared/model/create-order';
import { OrderSummary } from '../../shared/model/order-summary';
import { CurrecyService } from '../../shared/services/currecy-converter.service';
import { OrderService } from '../../shared/services/order.service';
import { ShopSummaryComponent } from '../shop-summary/shop-summary.component';

@Component({
  selector: 'app-list-coffee',
  templateUrl: './list-coffee.component.html',
  styleUrls: ['./list-coffee.component.scss']
})
export class ListCoffeeComponent implements OnInit {

  coffees: GetCoffee[] = [];
  coffeesCopy: GetCoffee[] = [];
  coffeeImage = 'https://source.unsplash.com/150x100/?coffee';
  selectedCurrency = 'USD';
  breakpoint: number;
  selectedCoffees: number[] = [];
  cols = 1;
  TRM: number;

  constructor(private coffeeService: BaseCoffeeService,
              private orderService: OrderService,
              private dialog: MatDialog,
              private currencyService: CurrecyService) { }

  ngOnInit(): void {
    this.loadTRM();
    this.loadCoffees();
  }

  loadTRM() {
    this.currencyService.getTrmUSDToCOP().subscribe(
      trm => this.TRM = trm.USD_COP,
      catchError => this.handleCoffeesError(catchError)
    );
  }

  public changeCurrency(isoCode: string) {
    this.selectedCurrency = isoCode;
    if (isoCode === 'COP') {
      this.coffees.map(m => {
        m.price = +(m.price * this.TRM).toFixed(0);
      });
    }
    if (isoCode === 'USD') {
      this.coffees = [];
      this.coffeesCopy.forEach(val => this.coffees.push(Object.assign({}, val)));
    }
  }

  private loadCoffees() {
    this.coffeeService.getAll()
      .subscribe(
        (coffees: GetCoffee[]) => {
          this.coffees = coffees;
          coffees.forEach(val => this.coffeesCopy.push(Object.assign({}, val)));
        },
        err => this.handleCoffeesError(err)
      );
  }

  private handleCoffeesError(err) {
    console.error(err);
    alert('Problema cargando cafés!');
  }


  selectCoffee(checked: boolean, coffee: GetCoffee) {
    if (checked) {
      this.selectedCoffees.push(coffee.id);
    } else {
      const indexOf = this.selectedCoffees.findIndex(c => c === +coffee.id);
      this.selectedCoffees.splice(indexOf, 1);
    }
  }

  resumeOrder() {
    if (this.selectedCoffees.length < 1) {
      alert('Debe seleccionar minimo un café');
      return;
    }
    const order: CreateOrder = { coffees: this.selectedCoffees, currency: this.selectedCurrency };
    this.orderService.create(order).subscribe(orderSumary => {
      console.log(orderSumary);

      this.openSummaryDialog(orderSumary);
    });
  }

  openSummaryDialog(order: OrderSummary) {
    console.log(order);

    const dialogRef = this.dialog.open(ShopSummaryComponent, {
      width: 'auto',
      data: order,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      console.log(result);
    });
  }

}
