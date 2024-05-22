import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { Home2Component } from './home2/home2.component';
import { EmptyComponent } from '@worktile/planet';

const routes: Routes = [
  {
    path: '**',
    component: EmptyComponent,
    children: [
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
