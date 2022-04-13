import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  aim="Your Perfect Banking Partner";
  
  user:any
  acno:any // element passing from parent(dashboard) to child (deleteconfirmation) component
  lDate:any //elemen used for angular pipe operators

  depositForm=this.fb.group({
    acno:['',[Validators.required,Validators.pattern('[0-9 ]*')]],    
    pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
    amnt:['',[Validators.required,Validators.pattern('[0-9]*')]]
  })
  
  withdrawForm=this.fb.group({
    acno1:['',[Validators.required,Validators.pattern('[0-9 ]*')]],    
    pswd1:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
    amnt1:['',[Validators.required,Validators.pattern('[0-9]*')]]
  })
  constructor(private ds: DataService,private fb:FormBuilder,private router:Router) { 
      if(localStorage.getItem("currentUser")){
        this.user= JSON.parse(localStorage.getItem("currentUser")||'') 
      }      
      this.lDate= new Date();
  }

  ngOnInit(): void {
      if(!localStorage.getItem("token")){
        alert("Please login ...")
        this.router.navigateByUrl("");
    }

     /* if(!localStorage.getItem("currentAcno")){
          alert("Please login ...")
          this.router.navigateByUrl("");
      }*/
  }

  deposit(){
    
    var acno=this.depositForm.value.acno
    var pswd=this.depositForm.value.pswd
    var amnt=this.depositForm.value.amnt

   // console.log(acno,pswd,amnt);
    
    
    if(this.depositForm.valid){
      this.ds.deposit(acno,pswd,amnt)
      .subscribe((result:any)=>{
          if(result){
            alert(result.message);
          }
      },
          (result)=>{
            alert(result.error.message)
          }
      )
      
    }
    
  }
  withdraw(){
    var acno1=this.withdrawForm.value.acno1
    var pswd1=this.withdrawForm.value.pswd1
    var amnt1=this.withdrawForm.value.amnt1

    
    if(this.withdrawForm.valid){
      this.ds.withdraw(acno1,pswd1,amnt1)
      .subscribe((result:any)=>{
        if(result){
          alert(result.message);
        }
    },
        (result)=>{
          alert(result.error.message)
        }
    )
    }
    else{
        alert("Invalid Form")
    }
    
  }
  logout(){
    localStorage.removeItem("currentAcno");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("token");
    this.router.navigateByUrl("");

  }
  //functions happened in parent(dashboard) component when child (deleteconfirmation) component triggered any event
  deleteAcc()
  {
    this.acno=JSON.parse(localStorage.getItem("currentAcno")||"")

  }
  deleteFromParent(event:any){
      this.ds.deleteAccount(event)
      .subscribe((result:any)=>{
        alert(result.message)
        this.logout();
      },
      (result)=>{
        alert(result.error.message)        
      }
      )
  }
  cancelFromParent(){
    
    this.acno = ""
  }
}
function subscribe(arg0: (result: any) => void, arg1: (result: any) => void) {
  throw new Error('Function not implemented.');
}

