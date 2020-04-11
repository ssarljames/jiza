import { ProjectTask } from './../project-task/project-task';
import { Model } from '../model/model';
import { User } from '../user/user';

export class Project extends Model{
  title:        string;
  description:  string;
  user_id:      string;
  archived_at:  Date;
  photo_path:   string;

  owner: User;
  members: User[];
  members_limited: User[];

  phases: any[];

  tasks: ProjectTask[];

  members_count: number;

  get members_count_label(): string{
    return this.members_count > 0 ? this.members_count + '' : '';
  }
}
