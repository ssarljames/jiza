import { Injectable } from '@angular/core';
import { Project } from '../../models/project/project';
import { ResourceService } from '../../core/services/resource/resource.service';
import { HttpClient } from '@angular/common/http';
import { ResourceAction } from '../../core/services/resource/resource.service'
import { Store } from '@ngrx/store';
import { ProjectAddAction, ProjectUpdateAction, ProjectLoadAction, ProjectRemoveAction } from '../../store/project/actions';
import { ProjectTask } from 'src/app/models/project-task/project-task';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProjectPhase } from 'src/app/models/project-phase/project-phase';


class ProjectAction implements ResourceAction<Project> {

    constructor(public store: Store){

    }

    create(project: Project): void {
      this.store.dispatch(new ProjectAddAction(project));
    }
    update(project: Project): void {
      this.store.dispatch(new ProjectUpdateAction(project));
    }
    list(project: Project[]): void {
      this.store.dispatch(new ProjectLoadAction(project));
    }
    read(project: Project): void {
      this.store.dispatch(new ProjectUpdateAction(project));
    }
    delete(project: Project): void {
      this.store.dispatch(new ProjectRemoveAction(project));
    }
}


@Injectable({
  providedIn: 'root'
})
export class ProjectService extends ResourceService<Project> {

  constructor(private http: HttpClient, public store: Store<{projects: Project[]}>) {
    super(http, 'projects', null, new ProjectAction(store));
  }

  public createTask(project: Project, task: ProjectTask): Observable<ProjectTask>{
    return this.http.post<ProjectTask>(`${this.getResourceURI()}/${project.id}/tasks`, task);
  }

  public updateTask(project: Project, task: ProjectTask): Observable<ProjectTask>{

    return this.http.put<ProjectTask>(`${this.getResourceURI()}/${project.id}/tasks/${task.id}`, task);
  }

  public getTask(project: Project, task: ProjectTask): Observable<ProjectTask> {
    return this.http.get<ProjectTask>(`${this.getResourceURI()}/${project.id}/tasks/${task.id}`);
  }
}
