import { NgModule } from '@angular/core';
import { Routes, RouterModule, RouteReuseStrategy } from '@angular/router';
import { Page1Component } from './page1/page1.component';
import { Page2Component } from './page2/page2.component';
import { Page3Component } from './page3/page3.component';
import { Page4Component } from './page4/page4.component';
import { Page5Component } from './page5/page5.component';
import { EmptyComponent } from '@worktile/planet';
import { CustomReuseStrategy } from 'src/cms/RouteReuseStrategy';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'page1' },
  { path: 'page1', component: Page1Component, data: { title: 'Page1' } },
  { path: 'page2', component: Page2Component, data: { title: 'Page2' } },
  { path: 'page3', component: Page3Component, data: { title: 'Page3' } },
  { path: 'page4', component: Page4Component, data: { title: 'Page4' } },
  { path: 'page5', component: Page5Component, data: { title: 'Page5' } },
  {
    path: 'app1',
    component: EmptyComponent,
    data: { title: 'APP1' },
    children: [
      {
        path: '**',
        component: EmptyComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { paramsInheritanceStrategy: 'always' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
