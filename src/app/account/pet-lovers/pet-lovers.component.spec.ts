import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetLoversComponent } from './pet-lovers.component';

describe('PetLoversComponent', () => {
  let component: PetLoversComponent;
  let fixture: ComponentFixture<PetLoversComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PetLoversComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PetLoversComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
