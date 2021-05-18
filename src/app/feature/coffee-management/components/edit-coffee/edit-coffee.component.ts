import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CoffeeService } from '../../shared/services/coffee.service';
import { UpdateCoffee } from '../../shared/model/edit-coffee';

@Component({
  selector: 'app-edit-coffee',
  templateUrl: './edit-coffee.component.html',
  styleUrls: ['./edit-coffee.component.scss']
})
export class EditCoffeeComponent implements OnInit {

  categories = [
    { id: 1, description: 'Clasico' },
    { id: 2, description: 'Especialidad' },
  ];

  formGroup: FormGroup;
  control: FormControl;
  // selectedCategory;

  constructor(private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditCoffeeComponent>,
    private coffeeService: CoffeeService,
    @Inject(MAT_DIALOG_DATA) public coffee: UpdateCoffee) {

    this.formGroup = this.fb.group({
      id: [coffee.id, [Validators.required]],
      name: [coffee.name, [Validators.required]],
      categoryId: [coffee.categoryId, [Validators.required]],
      price: [coffee.price, [Validators.required, Validators.min(1)]],
      units: [coffee.units, [Validators.required, Validators.min(1)]],
    });
    const index = this.categories.findIndex(c => c.id == coffee.categoryId);
    this.formGroup.setControl('categoryId', new FormControl(this.categories[index].id));
  }

  ngOnInit(): void {
  }

  onCloseClick() {
    this.dialogRef.close();
  }

  onSubmitClick() {
    const coffee: UpdateCoffee = this.formGroup.getRawValue();
    this.coffeeService.update(coffee).subscribe(
      () =>{
        this.dialogRef.close(coffee);
        this.makeCoffeeResponse(coffee);
      })
  }

  makeCoffeeResponse(coffee: UpdateCoffee) {
    let obj = {
      id: coffee.id,
      name: coffee.name,
      categoryId: coffee.categoryId,
      categoryDescription: this.categories.find(x => x.id == coffee.categoryId).description,
      price: coffee.price,
      units: coffee.units
    }
    this.dialogRef.close(obj);
  }

  compareFn(c1: any, c2: any): boolean {
    return c1 == c2;
  }


}
