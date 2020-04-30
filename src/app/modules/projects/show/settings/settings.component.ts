import { ModalService } from 'src/app/modules/shared/services/modal/modal.service';
import { ProjectMember } from './../../../../models/project/project';
import { User } from 'src/app/models/user/user';
import { map } from 'rxjs/operators';
import { UserService } from 'src/app/services/user/user.service';
import { MaterialAutocompleteFetchOption, MaterialAutoCompleteOption } from './../../../shared/utils/material-autocomplete/material-autocomplete.component';
import { FormControl, Validators } from '@angular/forms';
import { FormGroup } from 'src/app/core/utils/form-group/form-group';
import { Component, OnInit, Input, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { Project } from 'src/app/models/project/project';
import { ProjectService } from 'src/app/services/project/project.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CreateProjectPhaseComponent } from './create-project-phase/create-project-phase.component';
import { ProjectPhase } from 'src/app/models/project-phase/project-phase';

@Component({
  selector: 'app-project-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy, OnChanges {

  @Input() project: Project;

  _project: Project;

  form: FormGroup;

  searchUser: FormControl;
  autoCompleteOpt: MaterialAutocompleteFetchOption;

  isSaving: boolean = false;

  constructor(private userService: UserService,
              private projectService: ProjectService,
              private modalService: ModalService,
              private matDialog: MatDialog) {
    this.searchUser = new FormControl('');

  }
  ngOnDestroy(): void {

  }


  ngOnChanges(changes: SimpleChanges): void {
    if(changes.project)
      this._project = Project.newInstance(changes.project.currentValue);
  }

  ngOnInit(): void {

    this._project = Project.newInstance(this.project);

    this.form = new FormGroup({
      title: new FormControl(this._project.title, Validators.required),
      description: new FormControl(this._project.description)
    });


    this.autoCompleteOpt = {
      url: this.userService.getResourceURI(),
      payload: {
        not_in_project_id: this._project.id
      },
      mapResult: (result): MaterialAutoCompleteOption[] => {

        let users: MaterialAutoCompleteOption[] = [];

        if(result.data){
          users = result.data.map((user: User): MaterialAutoCompleteOption => {
            return {
              label: user.fullname,
              value: user
            }
          })
        }

        return users;
      }
    }
  }

  addMember(user: ProjectMember): void{

    this._project.members = this._project.members.filter(m => m.id != user.id);

    this._project.members.push(user);

    this.form.markAsDirty();
  }

  saveProject(): void{
    if(this.form.valid){

      let p: any = (new Project()).formFill(this.form).set('id', this._project.id);

      const new_members: ProjectMember[] = this._project.members.filter(m => !m.pivot);
      if(new_members.length > 0)
        p.new_members = new_members.map(m => {
          return {
            user_id: m.id
          }
        });


      const members_to_remove: ProjectMember[] = this._project.members.filter(m => m._removing);
      if(members_to_remove.length > 0)
        p.members_to_remove = members_to_remove.map(m => {
          return {
            user_id: m.id
          }
        });


      const new_phases: ProjectPhase[] = this._project.phases.filter(p => !p.id);
      if(new_phases){
        p.new_phases = new_phases;
      }

      this.isSaving = true;

      this.projectService.update(p).subscribe(p => {

        this.isSaving = false;
        this.modalService.toast('Project changes saved succesfully', 'Success', 'success');

        this.form.markAsPristine();

      }, e => {
        this.form.fillErrors(e);

        this.isSaving = false;

        for (const key in e.error.errors) {

          this.modalService.toast(e.error.errors[key], 'Error', 'error');
        }
      });
    }
    else
      this.modalService.toast('Check for errors', 'Oops');
  }

  removeMember(member: ProjectMember): void{
    if(!member.pivot)
        this._project.members = this._project.members.filter(m => m.id != member.id);
    else
        this._project.members = this._project.members.map(m =>{

          const mem = ProjectMember.newInstance(m);

          if(mem.id == member.id){
            mem.set('_removing', true);
            this.form.markAsDirty();
          }

          return mem;
        });
  }

  undoRemoveMember(member: ProjectMember): void{
    member.set('_removing', false);
  }

  createPhase(): void{
    const modal: MatDialogRef<CreateProjectPhaseComponent> = this.matDialog.open(CreateProjectPhaseComponent, {
      data: {
        project: this._project
      },
      disableClose: true
    });

    modal.afterClosed().subscribe((phase: ProjectPhase) => {
      if(phase){
        this._project.phases = this._project.phases.map( (p: ProjectPhase) => {

          const ph = ProjectPhase.newInstance(p);

          if(ph.order >= phase.order)
            ph.order++;

          return ph;
        });

        this._project.phases.push(phase);

        this.form.markAsDirty();
      }
    });
  }

  editPhase(p_: ProjectPhase): void{
    const modal: MatDialogRef<CreateProjectPhaseComponent> = this.matDialog.open(CreateProjectPhaseComponent, {
      data: {
        project: this._project,
        phase: p_
      },
      disableClose: true
    });

    modal.afterClosed().subscribe((phase: ProjectPhase) => {
      if(phase){
        this._project.phases = this._project.phases.map( (p: ProjectPhase) => {

          const ph = ProjectPhase.newInstance(p);

          if(ph.order >= phase.order)
            ph.order++;

          if(p_.id == ph.id)
            return phase;

          return ph;
        });

        this.form.markAsDirty();
      }
    });
  }

}
