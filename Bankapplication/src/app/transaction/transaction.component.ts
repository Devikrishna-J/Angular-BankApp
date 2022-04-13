import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  transactions:any 
  acno:any
  constructor(private ds: DataService,private router:Router) {

    this.acno = JSON.parse(localStorage.getItem("currentAcno")||" ")
    //asynchronous 
    this.ds.getTransaction(this.acno)
    .subscribe((result:any)=>{
      if(result){
        this.transactions = result.transaction
      }
    },
      (result)=>{
          alert(result.error.message)
          
      }
    )  
    
   }

  ngOnInit(): void {
    if(!localStorage.getItem("currentAcno")){
      alert("Please login ...")
      this.router.navigateByUrl("");
  }
  }
  logout(){
    localStorage.removeItem("currentAcno");
    localStorage.removeItem("currentUser");
    this.router.navigateByUrl("");

  }

}
