import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnimationdemoComponent } from './animationdemo/animationdemo.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TransactionComponent } from './transaction/transaction.component';

const routes: Routes = [
  {
    path:"dashboard",component:DashboardComponent,
  },
  {
    path:"",component:LoginComponent
  },
  {
    path:"register",component:RegisterComponent
  },
  {
    path:"transaction",component:TransactionComponent
  },
  {
    path:"animationdemo",component:AnimationdemoComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
