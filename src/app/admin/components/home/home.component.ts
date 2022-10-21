import { AccountService } from 'src/app/shared/services/account.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  isActive: boolean;
  constructor(public accountService: AccountService) {}

  ngOnInit(): void {
    this.isActive = this.accountService.isPermissions(`admin.cart`);
  }
}
