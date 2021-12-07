import { AccountService } from './_services/account.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from './_models/user';
import {debounceTime} from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'The Dating App';
  users: any;

  constructor(
    private http: HttpClient,
    private accountService: AccountService
  ) {

  }

  setCurrentUser() {
    // @ts-ignore
    const user: User = JSON.parse(localStorage.getItem('user'));
    this.accountService.setCurrentUser(user);
  }

  getUsers(){
    this.http.get("https://localhost:5001/api/users").subscribe((response: any) => {
      this.users = response;
    }, error => {
      console.log(error);
    });
  }

  ngOnInit() {

    this.getUsers();
    this.setCurrentUser();
  }
}
