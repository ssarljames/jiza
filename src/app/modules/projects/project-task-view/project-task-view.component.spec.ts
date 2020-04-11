import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTaskViewComponent } from './project-task-view.component';

describe('ProjectTaskViewComponent', () => {
  let component: ProjectTaskViewComponent;
  let fixture: ComponentFixture<ProjectTaskViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectTaskViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectTaskViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
