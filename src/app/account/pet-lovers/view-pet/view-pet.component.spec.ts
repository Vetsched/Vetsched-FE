import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPetComponent } from './view-pet.component';

describe('ViewPetComponent', () => {
  let component: ViewPetComponent;
  let fixture: ComponentFixture<ViewPetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewPetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
