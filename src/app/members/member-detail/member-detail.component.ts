import { MembersService } from './../../_services/members.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {

  //@ts-ignore
  member: Member;

  constructor(
    private memberService: MembersService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    this.memberService.getMember(this.route.snapshot.paramMap.get('username') || '').subscribe(member => {
      this.member = member;
    })
  }

}
