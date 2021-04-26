import {HomeComponent} from './home/home.component';

import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthComponent} from './auth/auth.component';
import {AllegroAuthComponent} from './allegro/auth/auth.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {BrowserComponent} from './allegro/browser/browser.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {path: 'auth', component: AuthComponent},
  {path: 'allegro/auth', component: AllegroAuthComponent},
  {path: 'allegro/browser', component: BrowserComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {scrollPositionRestoration: 'top', useHash: false})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
