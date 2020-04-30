import { Observable } from 'rxjs';
import { ProjectService } from 'src/app/services/project/project.service';
import { MaterialSelectOption } from './../../shared/utils/material-select/material-select.component';
import { MaterialAutoCompleteOption } from './../../shared/utils/material-autocomplete/material-autocomplete.component';
import { Project } from './../../../models/project/project';
import { FormControl, Validators } from '@angular/forms';
import { FormGroup } from 'src/app/core/utils/form-group/form-group';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ProjectTask } from 'src/app/models/project-task/project-task';
import { ProjectPhase } from 'src/app/models/project-phase/project-phase';

@Component({
  selector: 'app-create-project-task',
  templateUrl: './create-project-task.component.html',
  styleUrls: ['./create-project-task.component.scss']
})
export class CreateProjectTaskComponent implements OnInit {

  editor = ClassicEditor;

  form: FormGroup;

  userAutoComplete: MaterialSelectOption;

  project: Project;

  project_members: MaterialAutoCompleteOption[];

  types: MaterialSelectOption[] = [
    {
      value: 1,
      label: 'Default'
    },
    {
      value: 2,
      label: 'Bug Fix'
    },
  ];

  phases: MaterialSelectOption[] = [];

  editMode: boolean;

  constructor(private dialogRef: MatDialogRef<CreateProjectTaskComponent>,
              @Inject(MAT_DIALOG_DATA) private data: any,
              private projectService: ProjectService) {


    const task: ProjectTask = data.task;

    this.editMode = task ? true : false;

    this.form = new FormGroup({
      id: new FormControl(task ? task.id : null),
      title: new FormControl( task ? task.title : '', Validators.required),
      description: new FormControl(task ? task.description :'<h3>No task description provided...</h3>'),
      user_id: new FormControl(task ? task.user_id : null),
      project_module_id: new FormControl(task ? task.project_module_id : null),
      type: new FormControl(task ? task.type : 1),
      current_project_phase_id: new FormControl(task ? task.current_project_phase_id : data.phase.id)
    });

    this.project = Project.newInstance(this.data.project);



    this.project_members = this.project.members.map( (user):MaterialSelectOption =>  {
      return {
        value: user.id,
        label: user.fullname
      }
    });


    this.phases = this.project.phases.map( (phase: ProjectPhase): MaterialSelectOption => {
      return {
        value: phase.id,
        label: phase.description
      }
    });
  }

  ngOnInit(): void {

  }

  close(): void{
    this.dialogRef.close();
  }

  save(): void{
    if(this.form.valid){

      const task: ProjectTask = (new ProjectTask).formFill(this.form);

      const request: Observable<ProjectTask> = this.editMode
                ? this.projectService.updateTask(this.project, task)
                : this.projectService.createTask(this.project, task);

      request.subscribe( task => {
        this.dialogRef.close(task);
      },
      e => {
        this.form.fillErrors(e);
      })
    }
  }
}
