import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Service } from './../classes/Service';
import { ApiUrl } from './../classes/ApiURL';
import { CountsPerServiceName } from './../classes/CountsPerServiceName';

@Injectable({
  providedIn: 'root'
})
export class ChartsService {
  services:Service[];
  apiUrl:ApiUrl =new ApiUrl();
  constructor(private httpClient: HttpClient) {

  }

  getServices(){
    return this.httpClient.get<Service[]>(
      this.apiUrl.controllerNameArr.get("serviceNames"));
  }

  getServicesCountsByName(){
    return this.httpClient.get<CountsPerServiceName[]>(this.apiUrl.controllerNameArr.get("customerCountPerService"))
  }

  getCountMonthsPerYear(year:number){
    return this.httpClient.get(this.apiUrl.controllerNameArr.get("customerCountPerYear")+year)
  }
}
