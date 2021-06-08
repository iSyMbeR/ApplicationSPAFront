import {Component, Injectable, OnInit} from '@angular/core';
import {BookService} from "../../services/book/book.service";
import {AuthorService} from "../../services/author/author.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Book} from "../../models/book";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
@Injectable()
export class BookListComponent implements OnInit {
  // @ts-ignore
  books: Book[];
  // @ts-ignore
  filteredBooks: Book[];
  sortedByDate :boolean = false;
  sortedByName :boolean = false;

  constructor(private datePipe: DatePipe, private bookService: BookService, private authorService: AuthorService) {
  }

  ngOnInit(): void {
    this.getBooks();
  }

  public getBooks(): void {
    this.bookService.getBooks().subscribe((response: Book[]) => {
        this.books = response;
        this.filteredBooks = this.books;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      });
  }

  getCorrectFormatDate(releaseDate: Date) {
    return this.datePipe.transform(releaseDate, 'yyyy-MM-dd');
  }

  filterFunction(filterValue: string) : void{
    this.filteredBooks = this.books.filter(book => {
      return book.name.toUpperCase().startsWith(filterValue.toUpperCase());
    });
  }

  filterFunctionDate() {
    this.sortedByDate = !this.sortedByDate;
    if(this.sortedByDate){
      this.filteredBooks.sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());
    } else
    this.filteredBooks.sort((a, b) => new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime());
  }
  filterFunctionName() {
    this.sortedByName = !this.sortedByName;
    if(this.sortedByName){
      this.books.sort((a, b) => b.name.localeCompare(a.name));
    } else
      this.books.sort((a, b) => a.name.localeCompare(b.name));
  }
}
