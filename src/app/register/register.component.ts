import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  file:File;
  incomingfile(event)
    {
    this.file= event.target.files[0];
    }

  constructor(private us:UserService,private rc:Router) { }

  ngOnInit(): void {
  }
   
  onSubmit(ref){
    let userObj=ref.value;
    
    
       let formData=new FormData();
       //adding image and other data to FormData object
       formData.append('photo',this.file,this.file.name);
 
       formData.append("userObj",JSON.stringify(userObj))
    this.us.createUser(formData).subscribe(
      res=>{
        if(res["message"]=="user already exists"){
          alert("Username already exist choose another")
        }
        if(res["message"]=="user created"){
          alert("registration success")
          
          this.rc.navigateByUrl("/login");
        }
      },
      err=>{
        alert("something went wrong");
        console.log(err)
      }
    )
  }
}
