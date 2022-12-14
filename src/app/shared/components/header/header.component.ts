import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(public accountService: AccountService) {}

  ngOnInit(): void {}
  logOut(): void {
    this.accountService.logOut();
  }
}
