import { UserReducer } from  './user/reducer';
import { ProjectReducer } from './project/reducer';

export const AppReducers = {
  users: UserReducer,
  projects: ProjectReducer
}
