import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { LoanComponent } from './loan/loan.component';
import { LoanListComponent } from './loan/loan-list/loan-list.component';
import { LoanDetailComponent } from './loan/loan-Item-detail/loan-detail.component';
import { LoanUpdateComponent } from './loan/loan-Item-detail/loan-update/loan-update.component';
import { LoanItemComponent } from './loan/loan-list/loan-item/loan-item.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { NewLoanComponent } from './loan/new-loan/new-loan.component';
import { GlobalService } from './global.service';

@NgModule({
  declarations: [
    AppComponent,
    LoanComponent,
    LoanListComponent,
    LoanDetailComponent,
    LoanUpdateComponent,
    LoanItemComponent,
    HeaderComponent,
   
    LoginComponent,
    NewLoanComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule 
  ],
  providers: [GlobalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
