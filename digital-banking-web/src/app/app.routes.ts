import { Routes } from '@angular/router';
import { Login } from './login/login';
import { AdminTemplate } from './admin-template/admin-template';
import { Customers } from './customers/customers';
import { NewCustomer } from './new-customer/new-customer';
import { AuthGuard } from './guards/auth-guard';

export const routes: Routes = [
    { path: "login", component: Login },
    { path: "", redirectTo: "/login", pathMatch: "full" },
    {
        path: "admin", component: AdminTemplate, canActivate: [AuthGuard],
        children: [
            { path: "customers", component: Customers },
            { path: "new-customer", component: NewCustomer },
            { path: "home", component: Customers } // Default home to customers for now
        ]
    }
];
