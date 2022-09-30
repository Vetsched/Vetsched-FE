import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetloverComponent } from './petlover.component';

describe('PetloverComponent', () => {
  let component: PetloverComponent;
  let fixture: ComponentFixture<PetloverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PetloverComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PetloverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
