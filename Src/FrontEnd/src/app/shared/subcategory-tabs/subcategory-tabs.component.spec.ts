import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcategoryTabsComponent } from './subcategory-tabs.component';

describe('SubcategoryTabsComponent', () => {
  let component: SubcategoryTabsComponent;
  let fixture: ComponentFixture<SubcategoryTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubcategoryTabsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubcategoryTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
