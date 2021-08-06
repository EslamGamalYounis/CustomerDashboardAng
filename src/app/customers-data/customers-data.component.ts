import { Component, OnInit } from '@angular/core';
import { Customer } from './../classes/Customer';
import { CustomerPaginationService } from './../services/customer-pagination.service';
import { HttpClient } from '@angular/common/http';
import { PaginatedResult } from '../classes/Pagination';
import { of } from 'rxjs';

@Component({
  selector: 'app-customers-data',
  templateUrl: './customers-data.component.html',
  styleUrls: ['./customers-data.component.css']
})
export class CustomersDataComponent implements OnInit {

  customers: Customer[] = [];
  searchText: string = "";
  config: any;

  constructor(private httpClient: HttpClient, private CustomerService: CustomerPaginationService) {
    this.getCustomers();
  }

  ngOnInit(): void {
    this.config = {
      itemsPerPage: 20,
      currentPage: 1,
      totalItems: 20
    }
  }

  pageChanged(event) {
    this.getCustomers(event);
  }

  onSearchClick(){
    this.CustomerService.getCustomers(this.searchText.trim(), 1, 20)
      .subscribe((response: PaginatedResult<Customer[]>) => {
        this.customers = response.result;
        this.config = {
          itemsPerPage: 20,
          currentPage: response.pagination.currentPage,
          totalItems: response.pagination.totalItems
        };
      },
        (error) => {
          return of(null);
        }
      );
  }

  getCustomers(pageNumber: number = 1) {
    this.CustomerService.getCustomers(this.searchText.trim(), pageNumber, 20)
      .subscribe((response: PaginatedResult<Customer[]>) => {
        this.customers = response.result;
        this.config = {
          itemsPerPage: 20,
          currentPage: response.pagination.currentPage,
          totalItems: response.pagination.totalItems
        };
      },
        (error) => {
          return of(null);
        }
      );
  }

}
