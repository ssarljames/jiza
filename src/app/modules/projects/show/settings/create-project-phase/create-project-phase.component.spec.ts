import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProjectPhaseComponent } from './create-project-phase.component';

describe('CreateProjectPhaseComponent', () => {
  let component: CreateProjectPhaseComponent;
  let fixture: ComponentFixture<CreateProjectPhaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateProjectPhaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateProjectPhaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
