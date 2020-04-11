import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResourceService } from 'src/app/core/services/resource/resource.service';
import { ProjectTask } from 'src/app/models/project-task/project-task';

@Injectable({
  providedIn: 'root'
})
export class ProjectTaskService extends ResourceService<ProjectTask> {

  constructor(http: HttpClient) {
    super(http, '')
  }
}
