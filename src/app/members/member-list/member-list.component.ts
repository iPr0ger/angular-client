import { MembersService } from './../../_services/members.service';
import { Member } from './../../_models/member';
import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  // @ts-ignore
  members$: Observable<Member[]>;

  constructor(
    private membersService: MembersService
  ) {
   }

  ngOnInit(): void {
    this.members$ = this.membersService.getMembers();
  }

}
