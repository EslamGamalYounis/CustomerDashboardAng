import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CustomersDataComponent } from './customers-data/customers-data.component';
import { CustomerComponent } from './customer/customer.component';

const routes:Routes=[
  {path:'home',component:HomeComponent},
  {path:'customersData',component:CustomersDataComponent},
  {
    path:'', redirectTo: '/home', pathMatch: 'full'
  },
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CustomersDataComponent,
    CustomerComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
