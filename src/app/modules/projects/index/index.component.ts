import { Component, OnInit } from '@angular/core';
import { Project } from '../../../models/project/project';
import { ProjectService } from '../../../services/project/project.service';
import { Store } from '@ngrx/store';
import { MatTableDataSource } from '@angular/material/table';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { User } from 'src/app/models/user/user';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  tableMode: boolean = true;

  projects: Project[] = [];

  currentUser: User;

  search: FormControl;

  constructor(private projectService: ProjectService,
              store: Store<{projects: Project[]}>,
              authService: AuthenticationService,
              private router: Router) {

    store.select('projects').subscribe(projects => {
      this.projects = projects;
    });

    this.currentUser = authService.user;

    this.search = new FormControl('');

  }

  ngOnInit(): void {
    this.fetchProjects();
  }

  fetchProjects(): void{
    this.projectService.query({
      params: {
        q: this.search.value
      }
    }).subscribe(projects => {

    });
  }

  sort(e): void{

  }

  changeDisplay(d: string): void{
    this.tableMode = d == 'list';

  }

  viewProject(project: Project): void{
    setTimeout(() => {
      this.router.navigate(['/p/projects', project.id]);
    }, 100);
  }

}
