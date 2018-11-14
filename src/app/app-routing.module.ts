import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ConversationComponent } from './conversation/conversation.component';
import { ProfileComponent } from './profile/profile.component';

import { AuthenticationGuard } from './services/authentication.guard';

const appRoutes: Routes = [
	{path: '',					component: HomeComponent},
	{path: 'home',				component: HomeComponent, canActivate: [AuthenticationGuard]},
	{path: 'conversation/:uid', component: ConversationComponent, canActivate: [AuthenticationGuard]},
	{path: 'login',		   		component: LoginComponent},
	{path: 'profile',	   		component: ProfileComponent, canActivate: [AuthenticationGuard]}
];

@NgModule({
  imports: [ RouterModule.forRoot(appRoutes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
