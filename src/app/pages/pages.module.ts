
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ComponentsModule } from './../components/components.module';
import { UserComponent } from './user/user.component';


@NgModule({
  declarations: [DashboardComponent, UserComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ComponentsModule
  ]
})
export class PagesModule { }
