import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTaskCardComponent } from './project-task-card.component';

describe('ProjectTaskCardComponent', () => {
  let component: ProjectTaskCardComponent;
  let fixture: ComponentFixture<ProjectTaskCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectTaskCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectTaskCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
