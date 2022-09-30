import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetLoverComponent } from './pet-lover.component';

describe('PetLoverComponent', () => {
  let component: PetLoverComponent;
  let fixture: ComponentFixture<PetLoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PetLoverComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PetLoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
