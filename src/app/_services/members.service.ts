import { Member } from '../_models/member';
import {HttpClient, HttpParams} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import {of} from "rxjs";
import {map} from "rxjs/operators";
import {PaginatedResult} from "../_models/pagination";



@Injectable({
  providedIn: 'root'
})
export class MembersService {

  baseUrl = environment.apiUrl;
  members: Member[] = [];
  paginatedResult: PaginatedResult<Member[]> = new PaginatedResult<Member[]>();

  constructor(
    private http: HttpClient
  ) { }

  getMembers(page?: number, itemsPerPage?: number) {
    let params = new HttpParams();

    if (page !== null && itemsPerPage !== null){
      // @ts-ignore
      params = params.append('pageNumber', page.toString());
      // @ts-ignore
      params = params.append('pageSize', itemsPerPage.toString());
    }

    return this.http.get<Member[]>(this.baseUrl + 'users', {observe: 'response', params}).pipe(
      map(response => {
        // @ts-ignore
        this.paginatedResult.result = response.body;
        if (response.headers.get('Pagination') !== null){
          // @ts-ignore
          this.paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return this.paginatedResult;
      })
    );
  }

  getMember(username: string) {
    const member = this.members.find(x => x.username === username);
    if (member !== undefined) return of(member);
    return this.http.get<Member>(this.baseUrl + 'users/' + username);
  }

  updateMember(member: Member) {
    return this.http.put(this.baseUrl + 'users', member).pipe(
      map(() => {
        const index = this.members.indexOf(member);
        this.members[index] = member;
      })
    );
  }

}
