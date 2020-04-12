import { ProjectTask } from './../project-task/project-task';
import { Model } from '../model/model';
import { User } from '../user/user';

interface ProjectMembership  {
  project_id: any;
  user_id: any;
  role: any;
  expired_at: Date;
  created_at: Date;
}

export class ProjectMember extends User {
  pivot: ProjectMembership;
}

export class Project extends Model{
  title:        string;
  description:  string;
  user_id:      string;
  archived_at:  Date;
  photo_path:   string;

  owner: User;
  members: ProjectMember[];
  members_limited: ProjectMember[];

  phases: any[];

  tasks: ProjectTask[];

  members_count: number;

  get members_count_label(): string{
    return this.members_count > 0 ? this.members_count + '' : '';
  }
}
