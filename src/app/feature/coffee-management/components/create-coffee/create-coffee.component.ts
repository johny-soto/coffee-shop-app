import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CoffeeService } from '../../shared/services/coffee.service';
import { CreateCoffee } from '../../shared/model/create-coffee';

@Component({
  selector: 'app-create-coffee',
  templateUrl: './create-coffee.component.html',
  styleUrls: ['./create-coffee.component.scss']
})
export class CreateCoffeeComponent implements OnInit {
  categories = [
    { id: 1, description: 'Clasico' },
    { id: 2, description: 'Especialidad' },
  ];

  formGroup: FormGroup;

  constructor(private fb: FormBuilder,
              public dialogRef: MatDialogRef<CreateCoffeeComponent>,
              private coffeeService: CoffeeService) {

    this.formGroup = this.fb.group({
      name: ['', [Validators.required]],
      categoryId: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(1)]],
      units: ['', [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit(): void {
  }

  onCloseClick() {
    this.dialogRef.close();
  }

  onSubmitClick() {
    const coffee: CreateCoffee = this.formGroup.getRawValue();
    this.coffeeService.save(coffee).subscribe(
      response => {
        this.makeCoffeeResponse(response.value, coffee);
      });
  }

  makeCoffeeResponse(coffeId: number, coffee: CreateCoffee) {
    const obj = {
      id: coffeId,
      name: coffee.name,
      categoryId: coffee.categoryId,
      categoryDescription: this.categories.find(x => x.id === +coffee.categoryId).description,
      price: coffee.price,
      units: coffee.units
    };
    this.dialogRef.close(obj);
  }

}
