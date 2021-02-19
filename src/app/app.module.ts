import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import{FormsModule} from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ContactusComponent } from './contactus/contactus.component';
import{HttpClientModule} from '@angular/common/http'
import { from } from 'rxjs';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';
import { UpdateprofileComponent } from './updateprofile/updateprofile.component';
import { ViewprofileComponent } from './viewprofile/viewprofile.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    ContactusComponent,
    UserdashboardComponent,
    UpdateprofileComponent,
    ViewprofileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
