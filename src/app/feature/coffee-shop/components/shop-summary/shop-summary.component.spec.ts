import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopSummaryComponent } from './shop-summary.component';

describe('ShopSummaryComponent', () => {
  let component: ShopSummaryComponent;
  let fixture: ComponentFixture<ShopSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
