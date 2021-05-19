import { Component, OnInit } from '@angular/core';
import { GetCoffee } from '../../shared/model/get-coffee';
import { CoffeeService } from '../../shared/services/coffee.service';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateCoffeeComponent } from '../create-coffee/create-coffee.component';
import { EditCoffeeComponent } from '../edit-coffee/edit-coffee.component';


@Component({
  selector: 'app-list-coffee',
  templateUrl: './list-coffee.component.html',
  styleUrls: ['./list-coffee.component.scss']
})
export class ListCoffeeComponent implements OnInit {

  displayedColumns: string[] = ['name', 'categoryDescription', 'price', 'units', 'action'];
  dataSource: MatTableDataSource<GetCoffee>;
  coffees: GetCoffee[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatTable,{static:true}) table: MatTable<any>;

  constructor(protected coffeeService: CoffeeService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadCoffees();
  }

  private loadCoffees() {
    this.coffeeService.getAll()
      .subscribe(
        (coffees: GetCoffee[]) => this.handleCoffees(coffees),
        err => this.handleCoffeesError(err)
      );

  }

  private handleCoffees(coffees: GetCoffee[]) {
    this.coffees = coffees;
    this.dataSource = new MatTableDataSource(this.coffees);
    this.dataSource.paginator = this.paginator;
  }

  private handleCoffeesError(err) {
    console.error(err);
    alert("Problema cargando cafés!")
  }

  addCoffee() {
    const dialogRef = this.dialog.open(CreateCoffeeComponent, {
      width: 'auto',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(!result) {
        return;
      }
      this.addRowCoffee(result);
      console.log(result);
    });
  }

  addRowCoffee(coffee: GetCoffee){
    this.coffees.push(coffee);
    this.dataSource = new MatTableDataSource(this.coffees);
    this.dataSource.paginator = this.paginator;
    this.table.renderRows();
  }

  editCoffee(coffee: GetCoffee) {
    const dialogRef = this.dialog.open(EditCoffeeComponent, {
      width: 'auto',
      data: coffee,
    });

    dialogRef.afterClosed().subscribe(result => {
      if(!result) {
        return;
      }
      this.updateRowCoffee(result);
      console.log(result);
    });

  }

  updateRowCoffee(coffee: GetCoffee){
    const index = this.coffees.findIndex(c => c.id == coffee.id);
      this.coffees.splice(index, 1, {
        id: coffee.id,
        name: coffee.name,
        categoryId: coffee.categoryId,
        categoryDescription: coffee.categoryDescription,
        price: coffee.price,
        units: coffee.units
      });
    this.coffees.push(coffee);
    this.dataSource = new MatTableDataSource(this.coffees);
    this.dataSource.paginator = this.paginator;
    this.table.renderRows();
  }

  deleteCoffee(coffee: GetCoffee) {
    if(confirm("Estas seguro de eliminar " + coffee.name)) {
      this.coffeeService.delete(coffee.id).subscribe(() => {
        this.deleteRowCoffee(coffee.id)
      })
    }
  }

  deleteRowCoffee(coffeeId: number){
    const indexOf = this.coffees.findIndex(c => c.id == coffeeId);
    this.coffees.splice(indexOf, 1);
    this.dataSource = new MatTableDataSource(this.coffees);
    this.dataSource.paginator = this.paginator;
    this.table.renderRows();
  }

}
