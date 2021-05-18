import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListCoffeeComponent } from './components/list-coffee/list-coffee.component';

const routes: Routes = [
  {
    path: '',
    component: ListCoffeeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoffeeManagementRoutingModule { }
