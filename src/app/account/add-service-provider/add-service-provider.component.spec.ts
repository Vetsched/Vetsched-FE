import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddServiceProviderComponent } from './add-service-provider.component';

describe('AddServiceProviderComponent', () => {
  let component: AddServiceProviderComponent;
  let fixture: ComponentFixture<AddServiceProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddServiceProviderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddServiceProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
