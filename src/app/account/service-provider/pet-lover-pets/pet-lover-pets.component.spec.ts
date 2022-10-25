import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetLoverPetsComponent } from './pet-lover-pets.component';

describe('PetLoverPetsComponent', () => {
  let component: PetLoverPetsComponent;
  let fixture: ComponentFixture<PetLoverPetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PetLoverPetsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PetLoverPetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
