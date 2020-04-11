import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProjectTaskComponent } from './create-project-task.component';

describe('CreateProjectTaskComponent', () => {
  let component: CreateProjectTaskComponent;
  let fixture: ComponentFixture<CreateProjectTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateProjectTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateProjectTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
