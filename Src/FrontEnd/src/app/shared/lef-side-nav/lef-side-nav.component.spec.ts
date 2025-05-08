import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LefSideNavComponent } from './lef-side-nav.component';

describe('LefSideNavComponent', () => {
  let component: LefSideNavComponent;
  let fixture: ComponentFixture<LefSideNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LefSideNavComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LefSideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
