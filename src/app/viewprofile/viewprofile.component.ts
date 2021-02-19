import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-viewprofile',
  templateUrl: './viewprofile.component.html',
  styleUrls: ['./viewprofile.component.css']
})
export class ViewprofileComponent implements OnInit {
  userObj;
  constructor(private us:UserService,private router:Router) { }

  ngOnInit(): void {
    //get username from local storage
    this.us.getUser(localStorage.getItem("username")).subscribe(
      res=>{
        this.userObj=res["message"];
        console.log(res["message"]);
      },
      err=>{
        alert("something went wrong")
        console.log(err)
      }
    )
  }


  updateprofile(){

    this.router.navigateByUrl("/userdashboard/updateprofile");
  }
}
