import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTaskComponentComponent } from './edit-task-component.component';

describe('EditTaskComponentComponent', () => {
  let component: EditTaskComponentComponent;
  let fixture: ComponentFixture<EditTaskComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditTaskComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditTaskComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
