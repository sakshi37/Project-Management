import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InactivateEmployeeComponent } from './inactivate-employee.component';

describe('InactivateEmployeeComponent', () => {
  let component: InactivateEmployeeComponent;
  let fixture: ComponentFixture<InactivateEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InactivateEmployeeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InactivateEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
