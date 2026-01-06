import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { Observable, catchError, map, throwError } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './customers.html',
  styleUrl: './customers.css'
})
export class Customers implements OnInit {
  customers!: Observable<any>;
  errorMessage!: string;
  searchFormGroup!: FormGroup;

  constructor(private customerService: CustomerService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      keyword: this.fb.control("")
    });
    this.handleSearchCustomers();
  }

  handleSearchCustomers() {
    let kw = this.searchFormGroup?.value.keyword;
    this.customers = this.customerService.searchCustomers(kw).pipe(
      catchError(err => {
        this.errorMessage = err.message;
        return throwError(err);
      })
    );
  }

  handleDeleteCustomer(c: any) {
    let conf = confirm("Are you sure?");
    if (!conf) return;
    this.customerService.deleteCustomer(c.id).subscribe({
      next: (resp) => {
        this.customers = this.customers.pipe(
          map(data => {
            let index = data.indexOf(c);
            data.slice(index, 1);
            return data;
          })
        );
      },
      error: err => {
        console.log(err);
      }
    })
  }

  handleCustomerAccounts(c: any) {
    this.router.navigateByUrl("/customer-accounts/" + c.id, { state: c });
  }
}
