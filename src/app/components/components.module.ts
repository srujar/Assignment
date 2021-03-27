import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { OverviewComponent } from './overview/overview.component';
import { RepositoriesComponent } from './repositories/repositories.component';
import { ProjectsComponent } from './projects/projects.component';
import { PackagesComponent } from './packages/packages.component';
import { CardsComponent } from './cards/cards.component';
import { PlotlyViaCDNModule } from 'angular-plotly.js';
import { PipeModule } from '../pipe/pipe.module';

PlotlyViaCDNModule.setPlotlyVersion('latest');

@NgModule({
  declarations: [HeaderComponent, FooterComponent, UserProfileComponent, OverviewComponent, RepositoriesComponent, ProjectsComponent, PackagesComponent, CardsComponent],
  imports: [
    CommonModule,
    PlotlyViaCDNModule,
    PipeModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    UserProfileComponent,
    OverviewComponent,
    ProjectsComponent,
    RepositoriesComponent,
    UserProfileComponent,
    PackagesComponent,
    CardsComponent
  ],
  providers:[
    
  ]
})
export class ComponentsModule { }
