import { Component, OnInit } from '@angular/core';
import { FormGroup } from 'src/app/core/utils/form-group/form-group';
import { Validators, FormControl } from '@angular/forms';
import { ProjectService } from 'src/app/services/project/project.service';
import { Project } from 'src/app/models/project/project';
import { ModalService } from '../../shared/services/modal/modal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  form: FormGroup;

  constructor(private projectService: ProjectService,
              private modalService: ModalService,
              private router: Router) {
    this.form = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl(''),
    });
  }

  ngOnInit(): void {

  }

  createProject(): void{
    if(this.form.valid)
      this.projectService.create(new Project().formFill(this.form)).subscribe(project => {
        this.modalService.toast('New project was created', 'Success', 'success');
        this.router.navigate(['/p/projects']);
      },
      e => {
        this.form.fillErrors(e);
      });
  }

}
