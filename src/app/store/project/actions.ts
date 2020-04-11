import { Action } from '@ngrx/store';
import { Project } from '../../models/project/project';

export enum ProjectActionTypes{
  Add    = '[Project] Add',
  Update = '[Project] Update',
  Remove = '[Project] Remove',
  Load   = '[Project] Load'
}

export class ProjectAction implements Action{
  type: string;
  payload: any;
}

export class ProjectAddAction extends ProjectAction{
  type = ProjectActionTypes.Add;
  constructor(public payload: Project){
    super();
  }
}


export class ProjectUpdateAction extends ProjectAction{
  type = ProjectActionTypes.Update;
  constructor(public payload: Project){
    super();
  }
}


export class ProjectRemoveAction extends ProjectAction{
  type = ProjectActionTypes.Remove;
  constructor(public payload: Project){
    super();
  }
}


export class ProjectLoadAction extends ProjectAction{
  type = ProjectActionTypes.Load;
  constructor(public payload: Project[]){
    super();
  }
}
