import {Component, OnInit} from '@angular/core';
import {Author} from "../../models/author";
import {Book} from "../../models/book";
import {BookService} from "../../services/book/book.service";
import {AuthorService} from "../../services/author/author.service";
import {HttpErrorResponse} from "@angular/common/http";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-authorlist',
  templateUrl: './authorlist.component.html',
  styleUrls: ['./authorlist.component.css']
})
export class AuthorlistComponent implements OnInit {

  // @ts-ignore
  authorsBooks: Map<Author, Book[]>;
  // @ts-ignore
  authors: Author[];
  hidden: boolean = false;
  sortedByFirstName :boolean = false;
  sortedByLastName :boolean = false;
  constructor(private datePipe: DatePipe, private bookService: BookService, private authorService: AuthorService) {
    this.authorsBooks = new Map();
  }

  ngOnInit(): void {
    this.getAuthors();
  }

  public getAuthors(): void {
    this.authorService.getAuthors().subscribe((response: Author[]) => {
        this.authors = response;
        console.log(this.authors[0].firstName + " tutaj swiezo po przypisaniu");
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      });
  }

  public getAuthorBooks(): void {
    this.authors.forEach(author => {
      this.bookService.getAllBooksOfAuthor(author.firstName, author.lastName).subscribe((response: Book[]) => {
        this.authorsBooks.set(author, response);
      });
    });
  }

  getCorrectFormatDate(releaseDate: Date) {
    return this.datePipe.transform(releaseDate, 'yyyy-MM-dd');
  }

  filterFunctionFirstName() {
    this.sortedByFirstName = !this.sortedByFirstName;
    if(this.sortedByFirstName){
      this.authors.sort((a, b) => b.firstName.localeCompare(a.firstName));
    } else
      this.authors.sort((a, b) => a.firstName.localeCompare(b.firstName));
  }
  filterFunctionLastName() {
    this.sortedByLastName = !this.sortedByLastName;
    if(this.sortedByLastName){
      this.authors.sort((a, b) => b.lastName.localeCompare(a.lastName));
    } else
      this.authors.sort((a, b) => a.lastName.localeCompare(b.lastName));
  }
}
