import { ProjectPhase } from 'src/app/models/project-phase/project-phase';
import { ProjectTaskViewComponent } from './project-task-view/project-task-view.component';
import { ProjectTask } from './../../../models/project-task/project-task';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/services/project/project.service';
import { Store } from '@ngrx/store';
import { Project } from 'src/app/models/project/project';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CreateProjectTaskComponent } from '../create-project-task/create-project-task.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit, OnDestroy {
    project_id: string;
    project: Project;

    isLoaded: boolean = false;

    subscription: Subscription;

  constructor(private store: Store<{projects: Project[]}>,
              private projectService: ProjectService,
              private activedRoute: ActivatedRoute,
              private matDialog: MatDialog) {

        this.project_id = activedRoute.snapshot.params.id;

        this.subscription = store.select('projects').subscribe(projects => {
          this.project = projects.find(p => p.id == this.project_id);
        })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();

  }

  ngOnInit(): void {
    this.fetchProject();
  }

  fetchProject(): void{
    this.projectService.read(this.project_id).subscribe((p) => {
      this.isLoaded = true;
    });
  }

}
