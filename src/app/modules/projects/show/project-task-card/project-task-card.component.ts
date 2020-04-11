import { ProjectTask } from './../../../../models/project-task/project-task';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-project-task-card',
  templateUrl: './project-task-card.component.html',
  styleUrls: ['./project-task-card.component.scss']
})
export class ProjectTaskCardComponent implements OnInit {

  isLoaded: boolean;
  @Input() task: ProjectTask = null;

  constructor() { }

  ngOnInit(): void {
  }

}
