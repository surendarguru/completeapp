import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactusComponent } from './contactus/contactus.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UpdateprofileComponent } from './updateprofile/updateprofile.component';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';
import { ViewprofileComponent } from './viewprofile/viewprofile.component';

const routes: Routes = [
  {path:"home",component:HomeComponent},
  {path:"register",component:RegisterComponent},
  {path:"login",component:LoginComponent},
  {path:"contactus",component:ContactusComponent},
  {path:"userdashboard",component:UserdashboardComponent,children:[
    {path:"viewprofile",component:ViewprofileComponent},
    {path:"updateprofile",component:UpdateprofileComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
