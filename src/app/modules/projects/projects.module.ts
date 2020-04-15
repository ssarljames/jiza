import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { IndexComponent } from './index/index.component';
import { SharedModule } from '../shared/shared.module';
import { CreateComponent } from './create/create.component';
import { ProjectCardComponent } from './project-card/project-card.component';
import { ShowComponent } from './show/show.component';
import { ProjectPhaseCardComponent } from './show/project-phase-card/project-phase-card.component';
import { ProjectTaskCardComponent } from './show/project-task-card/project-task-card.component';
import { ProjectTaskViewComponent } from './show/project-task-view/project-task-view.component';
import { CreateProjectTaskComponent } from './create-project-task/create-project-task.component';

import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { SettingsComponent } from './show/settings/settings.component';
import { StatusComponent } from './show/status/status.component';

@NgModule({
  declarations: [
    IndexComponent,
    CreateComponent,
    ProjectCardComponent,
    ShowComponent,
    ProjectPhaseCardComponent,
    ProjectTaskCardComponent,
    ProjectTaskViewComponent,
    CreateProjectTaskComponent,
    SettingsComponent,
    StatusComponent
  ],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    SharedModule,
    CKEditorModule
  ],
  entryComponents: [
    ProjectCardComponent,
    ProjectPhaseCardComponent,
    ProjectTaskCardComponent,
    SettingsComponent
  ]
})
export class ProjectsModule { }
