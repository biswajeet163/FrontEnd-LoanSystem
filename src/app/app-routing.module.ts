import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoanDetailComponent } from './loan/loan-Item-detail/loan-detail.component';
import { LoanListComponent } from './loan/loan-list/loan-list.component';
import { LoanComponent } from './loan/loan.component';
import { LoginComponent } from './login/login.component';
import { LoanUpdateComponent } from './loan/loan-Item-detail/loan-update/loan-update.component';
import { NewLoanComponent } from './loan/new-loan/new-loan.component';
import { AuthGuardService } from './auth-guard.service';

const routes: Routes = [

  { path: '', redirectTo: '/login', pathMatch: 'full' }, 
  { path: 'login', component: LoginComponent },   

  { path: 'admin-loans', component: LoanComponent, canActivate:[ AuthGuardService ] , children: [
      { path: '', component: LoanListComponent }, 
      { path: 'loan-detail', component: LoanDetailComponent }, 
      { path: 'loan-detail-update', component : LoanUpdateComponent},
      { path: 'originate-new-loan', component : NewLoanComponent}

    ]
  },  


  { path: 'user-loans', component: LoanComponent, children: [
    { path: '', component: LoanListComponent },
    { path: 'loan-detail', component: LoanDetailComponent }
  ]
}
 
];
   

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 
