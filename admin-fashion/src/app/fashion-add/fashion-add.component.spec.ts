import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FashionAddComponent } from './fashion-add.component';

describe('FashionAddComponent', () => {
  let component: FashionAddComponent;
  let fixture: ComponentFixture<FashionAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FashionAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FashionAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
