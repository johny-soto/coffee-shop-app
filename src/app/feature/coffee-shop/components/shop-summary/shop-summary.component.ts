import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditCoffeeComponent } from 'src/app/feature/coffee-management/components/edit-coffee/edit-coffee.component';
import { OrderSummary } from '../../shared/model/order-summary';
import { OrderService } from '../../shared/services/order.service';

@Component({
  selector: 'app-shop-summary',
  templateUrl: './shop-summary.component.html',
  styleUrls: ['./shop-summary.component.scss']
})
export class ShopSummaryComponent implements OnInit {

  formGroup: FormGroup;

  constructor(private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditCoffeeComponent>,
    private orderService: OrderService,
    @Inject(MAT_DIALOG_DATA) public order: OrderSummary) {
    this.formGroup = this.fb.group({
      id: [order.id],
      orderGrossPrice: [order.orderGrossPrice],
      discount: [order.discount],
      charges: [order.charges],
      total: [order.total],
    });
  }

  ngOnInit(): void {
  }

  onCloseClick() {
    this.dialogRef.close();
  }

  onSubmitClick() {
    const orderId = { orderId: this.order.id };
    this.orderService.place(orderId).subscribe(
      () => {
        this.dialogRef.close();
        alert("Gracias por su compra")
      })
  }

}
