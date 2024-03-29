import { MembersService } from './../../_services/members.service';
import { Member } from './../../_models/member';
import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Pagination} from "../../_models/pagination";

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  members: Member[] = [];
  // @ts-ignore
  pagination: Pagination;
  pageNumber = 1;
  pageSize = 5;

  constructor(
    private membersService: MembersService
  ) {
   }

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers() {
    this.membersService.getMembers(this.pageNumber, this.pageSize).subscribe(response => {
      this.members = response.result;
      this.pagination = response.pagination;
    });
  }

  pageChanged(event: any){
    this.pageNumber = event.page;
    this.loadMembers();
  }

}
