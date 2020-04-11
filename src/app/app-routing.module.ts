import { GuestGuard } from './core/guards/guest/guest.guard';
import { AuthenticatedGuard } from './core/guards/authenticated/authenticated.guard';
import { PageNotFoundComponent } from './layout/errors/page-not-found/page-not-found.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticatedPageComponent } from './layout/authenticated-page/authenticated-page.component';
import { IndexComponent } from './layout/index/index.component';
import { GuestPageComponent } from './layout/guest-page/guest-page.component';
import { environment } from 'src/environments/environment';


const routes: Routes = [
  {
    path: 'p',
    canActivate: [ AuthenticatedGuard ],
    component: AuthenticatedPageComponent,
    children: [
      {
        path: '',
        loadChildren: () => import(`./modules/dashboard/dashboard.module`).then(m => m.DashboardModule)
      },
      {
        path: 'users',
        loadChildren: () => import(`./modules/users/users.module`).then(m => m.UsersModule)
      },
      {
        path: 'account',
        loadChildren: () => import(`./modules/account/account.module`).then(m => m.AccountModule)
      },
      {
        path: 'projects',
        loadChildren: () => import(`./modules/projects/projects.module`).then(m => m.ProjectsModule)
      },

      {
        path: '**',
        component: PageNotFoundComponent
      }
    ]
  },

  {
    path: '',
    component: GuestPageComponent,
    canActivate: [ GuestGuard ],
    children: [
      {
        path: '',
        loadChildren: () => import(`./modules/guest/guest.module`).then(m => m.GuestModule)
      },

      {
        path: '**',
        component: PageNotFoundComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
