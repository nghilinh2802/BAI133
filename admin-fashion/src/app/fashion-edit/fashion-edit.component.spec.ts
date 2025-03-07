import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FashionEditComponent } from './fashion-edit.component';

describe('FashionEditComponent', () => {
  let component: FashionEditComponent;
  let fixture: ComponentFixture<FashionEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FashionEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FashionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
