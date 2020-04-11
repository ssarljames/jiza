import { ProjectPhase } from 'src/app/models/project-phase/project-phase';
import { ProjectTaskViewComponent } from './../project-task-view/project-task-view.component';
import { ProjectTask } from './../../../models/project-task/project-task';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/services/project/project.service';
import { Store } from '@ngrx/store';
import { Project } from 'src/app/models/project/project';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CreateProjectTaskComponent } from '../create-project-task/create-project-task.component';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {
  project_id: string;
  project: Project;

  isLoaded: boolean = false;

  constructor(private store: Store<{projects: Project[]}>,
              private projectService: ProjectService,
              private activedRoute: ActivatedRoute,
              private matDialog: MatDialog) {

        this.project_id = activedRoute.snapshot.params.id;

        store.select('projects').subscribe(projects => {
          this.project = projects.find(p => p.id == this.project_id);
        })
  }

  ngOnInit(): void {
    this.fetchProject();
  }

  fetchProject(): void{
    this.projectService.read(this.project_id).subscribe((p) => {
      this.isLoaded = true;
      this.project = (new Project()).fill(p);
    });
  }

  fetchTasks(): void{

  }


  viewTask(task: ProjectTask): void{
    const model: MatDialogRef<ProjectTaskViewComponent> =  this.matDialog.open(ProjectTaskViewComponent, {
      minWidth: '80vw',
      data: {
        task: task,
        project: this.project
      }
    });
  }

  createTask(phase: ProjectPhase): void{
    if(this.project){
      const model: MatDialogRef<CreateProjectTaskComponent> =  this.matDialog.open(CreateProjectTaskComponent, {
        minWidth: '80vw',
        disableClose: true,
        data: {
          project: this.project,
          phase: phase
        }
      });

      model.afterClosed().subscribe( (task: ProjectTask) => {
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
