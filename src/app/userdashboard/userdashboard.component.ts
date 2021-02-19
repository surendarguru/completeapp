import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.css']
})
export class UserdashboardComponent implements OnInit {
  username;
  constructor(private router:Router) { }

  ngOnInit(): void {
    this.username=localStorage.getItem("username")
  }

    userLogout(){

      localStorage.clear();

      this.router.navigateByUrl("/home");
    }
}
