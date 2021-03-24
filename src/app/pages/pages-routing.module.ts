import { UserResolverService } from './../service/user-resolver.service';
import { UserNotFoundComponent } from './user-not-found/user-not-found.component';
import { UserComponent } from './user/user.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserDetailsComponent } from './user-details/user-details.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard', component: DashboardComponent
  },
  {
    path: 'user',
    component: UserComponent,
    children: [
      {
        path: 'not-found',
        component: UserNotFoundComponent
      },
      {
        path: ':user_name',
        component: UserDetailsComponent,
        resolve: { user: UserResolverService }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
