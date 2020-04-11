import { Project } from "../../models/project/project";
import { ProjectAction, ProjectActionTypes } from "./actions";



export function ProjectReducer(state: Project[] = [], action: ProjectAction): Project[]{
  switch(action.type){
    case ProjectActionTypes.Add:
        return [...state, action.payload];

    case ProjectActionTypes.Update:

        if(state.find(project => project.id == action.payload.id))
          return state.map(project => {
            if(project.id === action.payload.id)
              return action.payload;
            return project;
          });
        else
          return [...state, action.payload];

    case ProjectActionTypes.Remove:
        return state.filter(project => project.id === action.payload.id);

    case ProjectActionTypes.Load:
        return action.payload;

    default: return state;
  }
}
