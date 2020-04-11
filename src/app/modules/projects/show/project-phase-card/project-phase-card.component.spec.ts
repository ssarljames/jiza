import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectPhaseCardComponent } from './project-phase-card.component';

describe('ProjectPhaseCardComponent', () => {
  let component: ProjectPhaseCardComponent;
  let fixture: ComponentFixture<ProjectPhaseCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectPhaseCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectPhaseCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
