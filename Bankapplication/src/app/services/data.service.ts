import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const options={
   headers: new HttpHeaders()       //{ 'Content-Type': 'application/json' }
}

@Injectable({
  providedIn: 'root'
})

export class DataService {

    currentUser:any
    currentAcno:any

  database:any={
    1000:{accountno:1000,uname:"Ram",password:"1000",balance:35000,transaction:[]},
    1001:{accountno:1001,uname:"Raj",password:"1001",balance:5000,transaction:[]},
    1002:{accountno:1002,uname:"Ravi",password:"1002",balance:3000,transaction:[]},
  }
  constructor( private http: HttpClient) {
   // this.getDetails();    //fetch data from localstorage whenever page load
  }
  // store details in local storage
  saveDetails(){
    if(this.database){
      localStorage.setItem("database",JSON.stringify(this.database))
    }
    if(this.currentUser){
      localStorage.setItem("currentUser",JSON.stringify(this.currentUser))
    }
    if(this.currentAcno){
      localStorage.setItem("currentAcno",JSON.stringify(this.currentAcno))
    }
  }
  
  //fetch data from localstorage
  getDetails(){
    if(localStorage.getItem("database")){
      this.database = JSON.parse(localStorage.getItem("database") || " " )
    }
    if(localStorage.getItem("currentUser")){
      this.currentUser = JSON.parse(localStorage.getItem("currentUser") || " " )
    }
    if(localStorage.getItem("currentAcno")){
      this.currentAcno = JSON.parse(localStorage.getItem("currentAcno") || " " )
    }

  } 

  //register component
 
  register(acno:any,uname:any,password:any){
      
    const data={
      acno,
      uname,
      password
    }
    return this.http.post("http://localhost:3000/register",data)
  }
   
  //login component
  login(acno:any,password:any){
      const data={
        acno,
        password
      }
      return this.http.post("http://localhost:3000/login",data)   //login API
    
  }
  
//dashboard component
  deposit(acno:any,pswd:any,amnt:any){
    const data={
      acno,
      pswd,
      amnt
    }
    
    //deposit api
    return this.http.post("http://localhost:3000/deposit",data,this.getOption())
  }

  //get options in httpheaders
  getOption(){
    const token = JSON.parse(localStorage.getItem("token")||'')

    let headers = new HttpHeaders()       //{ 'Content-Type': 'application/json' }
    if(token){
        headers = headers.append('x-access-token',token)
        options.headers = headers
    }
    return options
  }
  withdraw(acno:any,pswd:any,amnt:any){
    const data={
      acno,
      pswd,
      amnt
    }
    
    //deposit api
    return this.http.post("http://localhost:3000/withdraw",data,this.getOption())
  }

  //get transaction array -transaction component
  getTransaction(acno:any){
    const data={      
      acno
    }
    //transaction api
    return this.http.post("http://localhost:3000/transaction",data,this.getOption())
   
  }
  //delete account 
  deleteAccount(acno:any){
    //delete API
    return this.http.delete("http://localhost:3000/deleteAcc/"+acno)
  }

}

//client side: before integrating with server
/*register component
  register(acno:any,uname:any,password:any){
      let db=this.database;
      if(acno in db){
        return false;
      }
      else{
        db[acno]={
          acno,
          uname,
          password,
          balance:0,
          transaction:[]
        }
        this.saveDetails();
        return true;
      }

  }*/
  /*login component
  login(acno:any,password:any){
    
    let db=this.database;
    if(acno in db){
      if(password == db[acno]["password"]){
        this.currentUser=db[acno]["uname"]
        this.currentAcno=acno
        this.saveDetails();
        return true;
      }
      else{
        alert("Enter your registered Password")
        return false;
      }
    }
    else{
        alert("Account number not exist");
        return false;
    }
  }
  
  //dashboard component-deposit
  deposit(acno:any,pswd:any,amnt:any){
    var amount = parseInt(amnt)
    let db =this.database;
    if(acno in db){
      if(pswd == db[acno]["password"]){
        db[acno]["balance"]+=amount;
        db[acno].transaction.push({
          amount:amount,
          type:"CREDIT"
        })
        this.saveDetails();
        return db[acno]["balance"];
      }
      else{
        alert("Enter your registered Password")
        return false;
      }

    }
    else{
      alert("Account number not exist")
      return false;
    }
  }
  //dashboard component-withdraw
  withdraw(acno:any,pswd:any,amnt:any){
    var amount = parseInt(amnt);
    let db =this.database;
    if(acno in db){
      if(pswd == db[acno]["password"]){
          if(db[acno]["balance"]>amount){
            db[acno]["balance"]-=amount;
            db[acno].transaction.push({
              amount:amount,
              type:"DEBIT"
            })
            console.log(db);
            
            this.saveDetails();
            return db[acno]["balance"];
          }
          else{
            alert("Insufficient Balance in your Account")
            return false;
          }        
      }
      else{
        alert("Enter your registered Password")
        return false;
      }

    }
    else{
      alert("Account number not exist")
      return false;
    }
  }
//dashboard component- transaction history
  //get transaction array -transaction component
  getTransaction(){
    return this.database[this.currentAcno].transaction;
  }
  */