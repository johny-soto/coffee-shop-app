import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCoffeeComponent } from './list-coffee.component';

describe('ListCoffeeComponent', () => {
  let component: ListCoffeeComponent;
  let fixture: ComponentFixture<ListCoffeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCoffeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCoffeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
