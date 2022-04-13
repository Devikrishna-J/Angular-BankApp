import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  /*  strong password reg expression
  '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}'*/

  registerForm=this.fb.group({
    acno:['',[Validators.required,Validators.pattern('[0-9 ]*')]],    
    pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
    acholder:['',[Validators.required,Validators.pattern('[a-zA-Z ]*')]]
  })

  constructor(private ds:DataService,private router:Router,private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  register(){
    
    
    var uname=this.registerForm.value.acholder;
    var acno=this.registerForm.value.acno;
    var pswd=this.registerForm.value.pswd;
    const result=this.ds.register(acno,uname,pswd);
    if(this.registerForm.valid){
      //asynchronous
      this.ds.register(acno,uname,pswd)
      .subscribe((result:any)=>{
        if(result){
          alert("Register Success");
          this.router.navigateByUrl("")
          //console.log(this.ds);          
        }
      },
      result=>{
        alert(result.error.message);
        
      }
    )
  }
    else{
        alert("invalid form")
    }    
     
  }
}




/*
 if(result){
        alert("Register Success");
        this.router.navigateByUrl("")
        console.log(this.ds);
        
      }
      else{
        alert("Already user exist....please login")
        
      }
    }
    else{
        alert("Invalid Form");
    }
    */