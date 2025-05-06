import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivateEmployeeComponent } from './activate-employee.component';

describe('ActivateEmployeeComponent', () => {
  let component: ActivateEmployeeComponent;
  let fixture: ComponentFixture<ActivateEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivateEmployeeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivateEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
