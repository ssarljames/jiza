import { User } from 'src/app/models/user/user';
import { Project } from 'src/app/models/project/project';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent implements OnInit {

  @Input() project: Project;
  @Input() currentUser: User;

  constructor() { }

  ngOnInit(): void {

  }

}
