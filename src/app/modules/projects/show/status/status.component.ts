import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Project } from 'src/app/models/project/project';
import { ProjectService } from 'src/app/services/project/project.service';
import { ProjectTask } from 'src/app/models/project-task/project-task';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ProjectTaskViewComponent } from '../../project-task-view/project-task-view.component';
import { ProjectPhase } from 'src/app/models/project-phase/project-phase';
import { CreateProjectTaskComponent } from '../../create-project-task/create-project-task.component';
import { ShowComponent } from '../show.component';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-project-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit, OnDestroy{

  @Input() project: Project;

  @Output() reloadProject: EventEmitter<void> = new EventEmitter();

  isLoaded: boolean = false;


  constructor(private _store: Store<{projects: Project[]}>,
                private _projectService: ProjectService,
                private _activedRoute: ActivatedRoute,
                private _matDialog: MatDialog) {

  }

  ngOnInit(): void {
    console.log('Status init');
  }

  ngOnDestroy(): void {
    console.log('Status destroyed');
  }

  fetchTasks(): void{

  }


  viewTask(task: ProjectTask): void{
    const modal: MatDialogRef<ProjectTaskViewComponent> =  this._matDialog.open(ProjectTaskViewComponent, {
      minWidth: '80vw',
      data: {
        task: task,
        project: this.project
      }
    });


    modal.afterClosed().subscribe( (task: ProjectTask) => {

      if(task){
        this.reloadProject.emit();
      }

    });
  }

  createTask(phase: ProjectPhase): void{
    if(this.project){
      const modal: MatDialogRef<CreateProjectTaskComponent> =  this._matDialog.open(CreateProjectTaskComponent, {
        minWidth: '80vw',
        disableClose: true,
        data: {
          project: this.project,
          phase: phase
        }
      });

      modal.afterClosed().subscribe( (task: ProjectTask) => {
        if(task)
          this.project.set('phases', this.project.phases.map((phase: ProjectPhase) => {

            let ph = (new ProjectPhase()).fill(phase);

            if(task.current_project_phase_id == phase.id){
              ph.set('tasks', [task, ...phase.tasks]);
              console.log('new', ph.task);

            }

            return ph;
          }));



      });
    }
  }
}
