import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from "jwt-decode";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    isAuthenticated: boolean = false;
    roles: any;
    username: any;
    accessToken!: any;

    constructor(private http: HttpClient, private router: Router) { }

    public login(username: string, password: string) {
        let options = {
            headers: new HttpHeaders().set("Content-Type", "application/x-www-form-urlencoded")
        }
        let params = new URLSearchParams();
        params.set("username", username);
        params.set("password", password);
        // Note: Backend expects JSON body according to my implementation plan?
        // Let me check my backend AuthController.
        // Backend AuthController expects @RequestBody LoginRequest (JSON).
        // So I should send JSON.
        return this.http.post("http://localhost:8085/auth/login", { username, password });
    }

    public loadProfile(data: any) {
        this.isAuthenticated = true;
        this.accessToken = data['access-token'];
        let decodedJwt: any = jwtDecode(this.accessToken);
        this.username = decodedJwt.sub;
        this.roles = decodedJwt.roles; // depends on how I stored them
        // Store in local storage for persistence
        localStorage.setItem("access-token", this.accessToken);
    }

    public logout() {
        this.isAuthenticated = false;
        this.accessToken = undefined;
        this.username = undefined;
        this.roles = undefined;
        localStorage.removeItem("access-token");
        this.router.navigateByUrl("/login");
    }

    public loadTokenFromLocalStorage() {
        let token = localStorage.getItem("access-token");
        if (token) {
            this.loadProfile({ "access-token": token });
        }
    }
}
