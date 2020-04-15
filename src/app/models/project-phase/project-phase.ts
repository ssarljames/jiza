import { ProjectTask } from './../project-task/project-task';
import { Model } from './../model/model';
export class ProjectPhase extends Model{
  description: string;

  tasks: ProjectTask[];

  order: number;
}
