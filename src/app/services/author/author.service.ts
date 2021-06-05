import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Author} from "../../models/author";

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private httpClient: HttpClient) {
  }

  public getAuthors(): Observable<Author[]> {
    return this.httpClient.get<Author[]>(`${this.apiServerUrl}/author/all`);
  }

  public addAuthor(author: Author): Observable<Author> {
    return this.httpClient.post<Author>(`${this.apiServerUrl}/author`, author);
  }

  public updateAuthor(author: Author): Observable<Author> {
    return this.httpClient.put<Author>(`${this.apiServerUrl}/author`, author);
  }

  public deleteAuthor(authorId: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiServerUrl}/author/${authorId}`);
  }
}
