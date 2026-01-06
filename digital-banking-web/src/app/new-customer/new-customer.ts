import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomerService } from '../services/customer.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-customer',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './new-customer.html',
  styleUrl: './new-customer.css'
})
export class NewCustomer implements OnInit {
  newCustomerForm!: FormGroup;

  constructor(private fb: FormBuilder, private customerService: CustomerService, private router: Router) { }

  ngOnInit(): void {
    this.newCustomerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  handleSaveCustomer() {
    let customer = this.newCustomerForm.value;
    this.customerService.saveCustomer(customer).subscribe({
      next: data => {
        alert("Customer saved successfully!");
        this.router.navigateByUrl("/admin/customers");
      },
      error: err => {
        console.log(err);
      }
    });
  }
}
