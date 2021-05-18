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
  selectedCategory = new FormControl();

  constructor(private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditCoffeeComponent>,
    private coffeeService: CoffeeService,
    @Inject(MAT_DIALOG_DATA) public coffee: UpdateCoffee) {

    this.formGroup = this.fb.group({
      name: ['', [Validators.required]],
      categoryId: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(1)]],
      units: ['', [Validators.required, Validators.min(1)]],
    });
    const data = {
      name: coffee.name,
      categoryId: coffee.categoryId,
      price: coffee.price,
      units: coffee.units
    }
    const category = this.categories.find(x => x.id == coffee.categoryId)
    this.selectedCategory.setValue({categoryId: category.id, description: category.description});
    this.formGroup.setValue(data);
  }

  ngOnInit(): void {
  }

  onCloseClick() {
    this.dialogRef.close();
  }

  onSubmitClick() {
    const coffee: UpdateCoffee = this.formGroup.getRawValue();
    this.coffeeService.update(coffee).subscribe(
      () => this.dialogRef.close(coffee))
  }

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
}


}
