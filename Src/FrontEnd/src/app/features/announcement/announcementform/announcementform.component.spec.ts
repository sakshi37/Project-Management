import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementformComponent } from './announcementform.component';

describe('AnnouncementformComponent', () => {
  let component: AnnouncementformComponent;
  let fixture: ComponentFixture<AnnouncementformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnnouncementformComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
