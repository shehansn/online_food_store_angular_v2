import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputValidatonComponent } from './input-validaton.component';

describe('InputValidatonComponent', () => {
  let component: InputValidatonComponent;
  let fixture: ComponentFixture<InputValidatonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputValidatonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputValidatonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
