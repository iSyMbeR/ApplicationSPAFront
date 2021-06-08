import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Book} from "../../models/book";

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private httpClient: HttpClient) {
  }
  public getBooks(): Observable<Book[]> {
    return this.httpClient.get<Book[]>(`${this.apiServerUrl}/book/all`);
  }

  public getAllBooksOfAuthor(authorFirstName: string, authorLastName: string): Observable<Book[]> {
    return this.httpClient.get<Book[]>(`${this.apiServerUrl}/book/getAllBooksOfAuthor/${authorFirstName}/${authorLastName}`);
  }

  public getGenres(): Observable<string[]> {
    return this.httpClient.get<string[]>(`${this.apiServerUrl}/book/allGenres`);
  }

  public addBook(book: Book): Observable<Book> {
    return this.httpClient.post<Book>(`${this.apiServerUrl}/book`, book);
  }

  public updateBook(book: Book): Observable<Book> {
    return this.httpClient.put<Book>(`${this.apiServerUrl}/book`, book);
  }

  public deleteBookById(bookId: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiServerUrl}/book/${bookId}`);
  }
}


