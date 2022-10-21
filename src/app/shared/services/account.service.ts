import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  userKey: string;
  tokenKey: string;
  constructor(private router: Router, private toastr: ToastrService) {
    this.userKey = `user-data`;
    this.tokenKey = `token`;
  }
  isPublic(): boolean {
    return this.getUser;
  }

  setUser(data: any): void {
    localStorage.setItem(this.userKey, JSON.stringify(data));
    this.setUserToken(data.token);
  }
  get getUser(): any {
    return JSON.parse(localStorage.getItem(this.userKey));
  }
  getUserRole(): string {
    return this.getUser && this.getUser.role;
  }
  getUserToken(): string {
    return localStorage.getItem(this.tokenKey);
  }
  setUserToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  isAdminRole(): boolean {
    return this.getUserRole() == `admin`;
  }

  isUser(): boolean {
    return this.getUserRole() == `user`;
  }
  getUserId(): any {
    return this.getUser && this.getUser.id;
  }
  getFullName(): string {
    return (
      this.getUser &&
      `${this.getUser.name.firstName} ${this.getUser.name.lastName}`
    );
  }
  getPermissions(): string[] {
    return this.getUser && this.getUser.permissions;
  }
  isPermissions(permission: string): boolean {
    return this.getPermissions().includes(permission);
  }
  logOut(): void {
    this.toastr.error(`${this.getFullName()} is Logged out `, `Logged out`);

    localStorage.removeItem(this.userKey);
    localStorage.removeItem(this.tokenKey);
    this.router.navigate([`public/login`]);
  }
}
