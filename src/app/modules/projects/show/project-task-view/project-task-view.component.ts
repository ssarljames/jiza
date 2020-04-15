import { ProjectTask } from '../../../../models/project-task/project-task';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { ProjectService } from 'src/app/services/project/project.service';
import { Project } from 'src/app/models/project/project';
import { CreateProjectTaskComponent } from '../../create-project-task/create-project-task.component';

export interface TaskViewDialogData{
  task: ProjectTask;
  project: Project;
}

@Component({
  selector: 'app-project-task-view',
  templateUrl: './project-task-view.component.html',
  styleUrls: ['./project-task-view.component.scss']
})
export class ProjectTaskViewComponent implements OnInit {

  task: ProjectTask;
  project: Project;

  loaded: boolean = false;

  constructor(private dialogRef: MatDialogRef<ProjectTaskViewComponent>,
              @Inject(MAT_DIALOG_DATA) private data: TaskViewDialogData,
              private projectService: ProjectService,
              private matDialog: MatDialog) {


                this.task = data.task;
                this.project = data.project;

  }

  ngOnInit(): void {
    this.projectService.getTask((new Project()).set('id', this.task.project_id), this.task).subscribe( task => {
      this.task = task;
      this.loaded = true;

    });
  }

  close(): void{
    this.dialogRef.close();
  }

  edit(): void{

    const model: MatDialogRef<CreateProjectTaskComponent> =  this.matDialog.open(CreateProjectTaskComponent, {
      minWidth: '80vw',
      disableClose: true,
      data: {
        project: this.project,
        task: this.task
      }
    });

    model.afterClosed().subscribe( (task: ProjectTask) => {
      if(task)
        this.dialogRef.close(task);
    });

  }

}
