import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CustomerService {
    backendHost: string = "http://localhost:8085";

    constructor(private http: HttpClient) { }

    public getCustomers(): Observable<any> {
        return this.http.get(this.backendHost + "/customers");
    }

    public searchCustomers(keyword: string): Observable<any> {
        return this.http.get(this.backendHost + "/customers/search?keyword=" + keyword);
    }

    public saveCustomer(customer: any): Observable<any> {
        return this.http.post(this.backendHost + "/customers", customer);
    }

    public deleteCustomer(id: number): Observable<any> {
        return this.http.delete(this.backendHost + "/customers/" + id);
    }
}
