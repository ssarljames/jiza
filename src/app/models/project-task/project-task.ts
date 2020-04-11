import { ProjectPhase } from 'src/app/models/project-phase/project-phase';
import { User } from 'src/app/models/user/user';
import { Model } from './../model/model';

export enum ProjectTaskType {
  DEFAULT = 1,
  BUG_FIX = 2
}

export class ProjectTask extends Model {
  project_id: string;
  project_module_id: string;
  user_id: string;
  title: string;
  description: string;
  current_project_phase_id: string;
  done_at: Date;

  module: any;

  user: User;
  current_phase: ProjectPhase;

  type: ProjectTaskType;

  get typeLabel(): string{
    return this.type == ProjectTaskType.DEFAULT ?
              'Default' : 'Bug Fix';
  }
}
