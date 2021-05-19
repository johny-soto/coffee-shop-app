import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GetCoffee } from 'src/app/feature/coffee-management/shared/model/get-coffee';
import { CoffeeService } from 'src/app/feature/coffee-management/shared/services/coffee.service';
import { CreateOrder } from '../../shared/model/create-order';
import { OrderSummary } from '../../shared/model/order-summary';
import { OrderService } from '../../shared/services/order.service';
import { ShopSummaryComponent } from '../shop-summary/shop-summary.component';

@Component({
  selector: 'app-list-coffee',
  templateUrl: './list-coffee.component.html',
  styleUrls: ['./list-coffee.component.scss']
})
export class ListCoffeeComponent implements OnInit {

  coffees: GetCoffee[];
  coffeeImage = "https://source.unsplash.com/150x100/?coffee";
  breakpoint: number;
  selectedCoffees: number[] = [];
  cols = 1;

  constructor(private coffeeService: CoffeeService, private orderService:OrderService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadCoffees();
  }

  private loadCoffees() {
    this.coffeeService.getAll()
      .subscribe(
        (coffees: GetCoffee[]) => this.coffees = coffees,
        err => this.handleCoffeesError(err)
      );
  }

  private handleCoffeesError(err) {
    console.error(err);
    alert("Problema cargando cafés!")
  }


  selectCoffee(checked: boolean, coffee: GetCoffee){
    if(checked){
      this.selectedCoffees.push(coffee.id)
    }else{
      const indexOf = this.selectedCoffees.findIndex(c => c == coffee.id);
      this.selectedCoffees.splice(indexOf, 1);
    }
  }

  resumeOrder(){
    if(this.selectedCoffees.length < 1) {
      alert('Debe seleccionar minimo un café');
      return;
    }
    let order: CreateOrder = {coffees: this.selectedCoffees, currency: "USD" };
    this.orderService.create(order).subscribe(orderSumary => {
      this.openSummaryDialog(orderSumary);
    })
  }

  openSummaryDialog(order: OrderSummary) {
    const dialogRef = this.dialog.open(ShopSummaryComponent, {
      width: 'auto',
      data: order,
    });

    dialogRef.afterClosed().subscribe(result => {
      if(!result) {
        return;
      }
      console.log(result);
    });
  }

}
