import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class MessageService {
  baseUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) {
  }

  getMessages(pageNumber: number, pageSize: number, container: any){

  }
}
