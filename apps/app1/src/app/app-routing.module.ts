import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { Home2Component } from './home2/home2.component';
import { EmptyComponent } from '@worktile/planet';
import { DefaultLayoutComponent } from './default/default-layout.component';

const routes: Routes = [
  {
    path: 'app1',
    component: DefaultLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'home1',
        pathMatch: 'full',
      },
      {
        path: 'home1',
        component: HomeComponent,
      },
      {
        path: 'home2',
        component: Home2Component,
      },
    ],
  },
  {
    path: '**',
    component: EmptyComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
