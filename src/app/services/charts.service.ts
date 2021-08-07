import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Service } from './../classes/Service';

@Injectable({
  providedIn: 'root'
})
export class ChartsService {
  services:Service[];
  constructor(private httpClient: HttpClient) { }

  getServices(){
    return this.httpClient.get<Service[]>(
      "http://localhost:51329/api/service");
  }

  getServicesCountsByName(serviceName:string){
    return this.httpClient.get("http://localhost:51329/api/customer/count/"+serviceName)
  }

  getCountMonthsPerYear(year:number){
    return this.httpClient.get("http://localhost:51329/api/customer/count/year/"+year)
  }
}
