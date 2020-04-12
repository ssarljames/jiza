import { ModalService } from 'src/app/modules/shared/services/modal/modal.service';
import { ProjectMember } from './../../../../models/project/project';
import { User } from 'src/app/models/user/user';
import { map } from 'rxjs/operators';
import { UserService } from 'src/app/services/user/user.service';
import { MaterialAutocompleteFetchOption, MaterialAutoCompleteOption } from './../../../shared/utils/material-autocomplete/material-autocomplete.component';
import { FormControl, Validators } from '@angular/forms';
import { FormGroup } from 'src/app/core/utils/form-group/form-group';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Project } from 'src/app/models/project/project';
import { ProjectService } from 'src/app/services/project/project.service';

@Component({
  selector: 'app-project-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {

  @Input() project: Project;

  form: FormGroup;

  searchUser: FormControl;
  autoCompleteOpt: MaterialAutocompleteFetchOption;

  isSaving: boolean = false;

  constructor(private userService: UserService,
              private projectService: ProjectService,
              private modalService: ModalService) {
    this.searchUser = new FormControl('');

  }
  ngOnDestroy(): void {
    console.log('settings destryoed');

  }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(this.project.title, Validators.required),
      description: new FormControl(this.project.description)
    });


    this.autoCompleteOpt = {
      url: this.userService.getResourceURI(),
      payload: {
        not_in_project_id: this.project.id
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
    console.log(user);

    const members: ProjectMember[] = this.project.members.filter(m => m.id != user.id);

    this.project.members = [user, ...members];

    this.form.markAsDirty();
  }

  saveProject(): void{
    if(this.form.valid){

      let p: any = (new Project()).formFill(this.form).set('id', this.project.id);

      const new_members: ProjectMember[] = this.project.members.filter(m => !m.pivot);
      if(new_members.length > 0)
        p.new_members = new_members.map(m => {
          return {
            user_id: m.id
          }
        });

      this.isSaving = true;

      this.projectService.update(p).subscribe(p => {
        this.project = p;
        this.isSaving = false;
        this.modalService.toast('Project saved', 'Success', 'success');

        this.form.markAsPristine();

      }, e => {
        this.form.fillErrors(e);
        console.log(e);

        this.isSaving = false;

        for (const key in e.error.errors) {

          this.modalService.toast(e.error.errors[key], 'Error', 'error');
        }
      });
    }
    else
      this.modalService.toast('Check for errors', 'Oops');
  }

}
