import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ConversationComponent } from './conversation/conversation.component';
import { ProfileComponent } from './profile/profile.component';

const appRoutes: Routes = [
	{path: '',					component: HomeComponent},
	{path: 'home',				component: HomeComponent},
	{path: 'conversation/:uid', component: ConversationComponent},
	{path: 'login',		   		component: LoginComponent},
	{path: 'profile',	   		component: ProfileComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(appRoutes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
