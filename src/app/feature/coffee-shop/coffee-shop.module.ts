import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoffeeShopRoutingModule } from './coffee-shop-routing.module';
import { ListCoffeeComponent } from './components/list-coffee/list-coffee.component';
import { ShopSummaryComponent } from './components/shop-summary/shop-summary.component';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatGridListResponsiveModule } from 'src/lib/mat-grid-list-responsive/mat-grid-list-responsive.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { OrderService } from './shared/services/order.service';
import {MatSelectModule} from '@angular/material/select';
import {MatTooltipModule} from '@angular/material/tooltip';
import { CurrecyService } from './shared/services/currecy-converter.service';

@NgModule({
  declarations: [
    ListCoffeeComponent,
    ShopSummaryComponent
  ],
  imports: [
    CommonModule,
    CoffeeShopRoutingModule,
    MatListModule,
    MatCardModule,
    MatGridListModule,
    MatCheckboxModule,
    MatGridListResponsiveModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSelectModule,
    MatTooltipModule
  ],
  providers: [OrderService, CurrecyService]
})
export class CoffeeShopModule { }
