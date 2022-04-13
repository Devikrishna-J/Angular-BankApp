import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  aim="Your Perfect Banking Partner";
  accno="Your Account Number";

  

  loginForm=this.fb.group({
    acno:['',[Validators.required,Validators.pattern('[0-9 ]*')]],
    pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
  })
  constructor(private router:Router,private ds:DataService,private fb:FormBuilder) {}

  ngOnInit(): void {
  }

  get_acno(event:any){
    console.log(event.target.value);
    
  }

  login(){
   var acno=this.loginForm.value.acno
    var pswd=this.loginForm.value.pswd
    
    if(this.loginForm.valid){
      this.ds.login(acno,pswd)
      .subscribe((result:any)=>{
              if(result){
                localStorage.setItem("currentUser",JSON.stringify(result.currentUser))
                localStorage.setItem("currentAcno",JSON.stringify(result.currentAcno))
                localStorage.setItem("token",JSON.stringify(result.token))
                alert(result.message)
                this.router.navigateByUrl("dashboard")
              }
      },
          (result)=>{
              alert(result.error.message)          
          }
      )
      
      
    }  
    else{
      alert("Invalid form")
    }
    
  }

  //template reference variable
  /*login(a:any,p:any){
    var acno=a.value;
    var pwd=p.value;
    let db=this.database;
    if(acno in db){
      if(pwd == db[acno].password){
        alert("Login Success")
      }
      else{
        alert("Invalid password")
      }
    }
    else{
        alert("Invalid account number");
    }
  }*/

  //client before integrating with server
  /*
  login(){
   var acno=this.loginForm.value.acno
    var pswd=this.loginForm.value.pswd
    const result=this.ds.login(acno,pswd)
    if(this.loginForm.valid){
      if(result){       
        this.router.navigateByUrl("dashboard");   
      }
    }  
    
  }
  */
}
