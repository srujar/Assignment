import { UserResolverService } from './../service/user-resolver.service';
import { HttpClientCallService } from './../service/http-client-call.service';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ComponentsModule } from './../components/components.module';
import { UserComponent } from './user/user.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserNotFoundComponent } from './user-not-found/user-not-found.component';
import { HttpClientModule } from '@angular/common/http';

import { PlotlyViaCDNModule } from 'angular-plotly.js';
PlotlyViaCDNModule.setPlotlyVersion('latest');
// PlotlyViaCDNModule.plotlyBundle = null;

@NgModule({
  declarations: [DashboardComponent, UserComponent, UserDetailsComponent, UserNotFoundComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ComponentsModule,
    // HttpClientModule,
    // HttpClientCallService,
    // UserResolverService,
    PlotlyViaCDNModule

  ],
  providers: [
    UserResolverService
  ]
})
export class PagesModule { }