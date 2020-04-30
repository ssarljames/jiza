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
    list(projects: Project[]): void {
      this.store.dispatch(new ProjectLoadAction(projects));
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

  private updated: boolean = false;

  constructor(private http: HttpClient, public store: Store<{projects: Project[]}>) {
    super(http, 'projects', null, new ProjectAction(store));
  }

  public createTask(project: Project, task: ProjectTask): Observable<ProjectTask>{
    return this.http.post<ProjectTask>(`${this.getResourceURI()}/${project.id}/tasks`, task)
                .pipe(map(task => {


                  const p: Project = Project.newInstance(project);

                  p.phases = p.phases.map((phase: ProjectPhase): ProjectPhase => {

                    if(phase.id == task.current_project_phase_id){
                      const ph: ProjectPhase = ProjectPhase.newInstance(phase);
                      ph.tasks = [...ph.tasks, task];
                      return ph;
                    }

                    return phase;

                  });

                  this.store.dispatch(new ProjectUpdateAction(p));


                  return task;
                }));
  }

  public updateTask(project: Project, task: ProjectTask): Observable<ProjectTask>{

    return this.http.put<ProjectTask>(`${this.getResourceURI()}/${project.id}/tasks/${task.id}`, task)
                  .pipe(map(task => {


                    const p: Project = Project.newInstance(project);

                    p.phases = p.phases.map((phase: ProjectPhase): ProjectPhase => {


                      const ph: ProjectPhase = ProjectPhase.newInstance(phase);

                      ph.tasks = ph.tasks.filter( ptask => ptask.id != task.id);

                      if(ph.id == task.current_project_phase_id){
                        ph.tasks = [...ph.tasks, task];
                        return ph;
                      }

                      return ph;

                    });

                    this.store.dispatch(new ProjectUpdateAction(p));


                    return task;
                  }));
  }

  public getTask(project: Project, task: ProjectTask): Observable<ProjectTask> {
    return this.http.get<ProjectTask>(`${this.getResourceURI()}/${project.id}/tasks/${task.id}`);
  }
}
