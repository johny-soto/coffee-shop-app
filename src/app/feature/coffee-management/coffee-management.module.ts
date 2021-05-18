import { NgModule } from '@angular/core';

import { CoffeeManagementRoutingModule } from './coffee-management-routing.module';
import { CreateCoffeeComponent } from './components/create-coffee/create-coffee.component';
import { ListCoffeeComponent } from './components/list-coffee/list-coffee.component';
import { EditCoffeeComponent } from './components/edit-coffee/edit-coffee.component';
import { SharedModule } from '@shared/shared.module';
import { CoffeeService } from './shared/services/coffee.service';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {FormsModule} from '@angular/forms';

import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
    CreateCoffeeComponent,
    ListCoffeeComponent,
    EditCoffeeComponent
  ],
  imports: [
    CoffeeManagementRoutingModule,
    SharedModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule

  ],
  providers: [CoffeeService]

})
export class CoffeeManagementModule { }
