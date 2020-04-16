import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators, Validator, AbstractControl, ValidationErrors, AbstractControlOptions } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup } from 'src/app/core/utils/form-group/form-group';
import { ProjectPhase } from 'src/app/models/project-phase/project-phase';
import { Project } from 'src/app/models/project/project';
import { MaterialSelectOption } from 'src/app/modules/shared/utils/material-select/material-select.component';

export interface CreateProjectPhaseDialogData {
  project: Project;
  phase?: ProjectPhase;
}


@Component({
  selector: 'app-create-project-phase',
  templateUrl: './create-project-phase.component.html',
  styleUrls: ['./create-project-phase.component.scss']
})
export class CreateProjectPhaseComponent implements OnInit {

  form: FormGroup;

  phases: MaterialSelectOption[];

  constructor(private modal: MatDialogRef<CreateProjectPhaseComponent>,
              @Inject(MAT_DIALOG_DATA) private data: CreateProjectPhaseDialogData) {


    this.phases = this.data.project.phases.filter( (phase: ProjectPhase) => {
      return phase.order < this.data.project.phases.length;
    }).map( (phase: ProjectPhase): MaterialSelectOption => {
      return {
        label: phase.description,
        value: phase.order
      }
    });

    this.form = new FormGroup({
      description: new FormControl(this.data.phase
                                            ? this.data.phase.description
                                            : '',

                                            Validators.required),
      after: new FormControl(this.data.phase
                                ? this.data.phase.order - 1
                                : this.phases[this.phases.length - 1].value,

                                Validators.required)
    });

  }

  ngOnInit(): void {
  }

  save(): void{

    // const search = this.phases.find( p => {
    //   return p.label.toLowerCase() === this.form.controls.description.value.toString().toLowerCase();
    // })

    // if(search){
    //   this.form.controls.description.setErrors(['Description already exist']);
    //   return;
    // }

    this.modal.close(ProjectPhase.newInstance({
      description: this.form.controls.description.value,
      order: this.form.controls.after.value + 1
    }));

  }

  close(): void{
    this.modal.close();
  }

}
