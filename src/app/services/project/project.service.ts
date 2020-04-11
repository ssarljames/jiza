import { Injectable } from '@angular/core';
import { Project } from '../../models/project/project';
import { ResourceService } from '../../core/services/resource/resource.service';
import { HttpClient } from '@angular/common/http';
import { ResourceAction } from '../../core/services/resource/resource.service'
import { Store } from '@ngrx/store';
import { ProjectAddAction, ProjectUpdateAction, ProjectLoadAction, ProjectRemoveAction } from '../../store/project/actions';
import { ProjectTask } from 'src/app/models/project-task/project-task';
import { Observable } from 'rxjs';


class ProjectAction implements ResourceAction<Project> {

    constructor(public store: Store){

    }

    create(item: Project): void {
      this.store.dispatch(new ProjectAddAction(item));
    }
    update(item: Project): void {
      this.store.dispatch(new ProjectUpdateAction(item));
    }
    list(item: Project[]): void {
      this.store.dispatch(new ProjectLoadAction(item));
    }
    read(item: Project): void {
      this.store.dispatch(new ProjectUpdateAction(item));
    }
    delete(item: Project): void {
      this.store.dispatch(new ProjectRemoveAction(item));
    }
}


@Injectable({
  providedIn: 'root'
})
export class ProjectService extends ResourceService<Project> {

  constructor(private http: HttpClient, store: Store) {
    super(http, 'projects', null, new ProjectAction(store));
  }

  public createTask(project: Project, task: ProjectTask): Observable<ProjectTask>{
    return this.http.post<ProjectTask>(`${this.getResourceURI()}/${project.id}/tasks`, task);
  }

  public updateTask(project: Project, task: ProjectTask): Observable<ProjectTask>{

    console.log(task);


    return this.http.put<ProjectTask>(`${this.getResourceURI()}/${project.id}/tasks/${task.id}`, task);
  }

  public getTask(project: Project, task: ProjectTask): Observable<ProjectTask> {
    return this.http.get<ProjectTask>(`${this.getResourceURI()}/${project.id}/tasks/${task.id}`);
  }
}
