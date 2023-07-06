import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodAddEditPageComponent } from './food-add-edit-page.component';

describe('FoodAddEditPageComponent', () => {
  let component: FoodAddEditPageComponent;
  let fixture: ComponentFixture<FoodAddEditPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoodAddEditPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoodAddEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
