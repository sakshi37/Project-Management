import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateComponentComponent } from './state-component.component';

describe('StateComponentComponent', () => {
  let component: StateComponentComponent;
  let fixture: ComponentFixture<StateComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StateComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StateComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
