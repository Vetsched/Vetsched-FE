import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesModalComponent } from './services-modal.component';

describe('ServicesModalComponent', () => {
  let component: ServicesModalComponent;
  let fixture: ComponentFixture<ServicesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicesModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
