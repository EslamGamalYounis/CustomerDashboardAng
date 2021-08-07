import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CustomersDataComponent } from './customers-data/customers-data.component';
import { CustomerComponent } from './customer/customer.component';
import { CustomerPaginationService } from './services/customer-pagination.service';
import { HttpClientModule,HttpClient } from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';
import { ChartsModule } from 'ng2-charts';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { LineChartComponent } from './line-chart/line-chart.component';

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
    CustomerComponent,
    PieChartComponent,
    LineChartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    NgxPaginationModule,
    ChartsModule
  ],
  providers: [
    CustomerPaginationService,
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
