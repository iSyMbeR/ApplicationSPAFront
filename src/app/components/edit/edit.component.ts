import {Component, OnInit} from '@angular/core';
import {Book} from "../../models/book";
import {BookService} from "../../services/book/book.service";
import {AuthorService} from "../../services/author/author.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Author} from "../../models/author";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  // @ts-ignore
  books: Book[];
  // @ts-ignore
  bookModel = new Book(new Author(1, '', '', '', ''), 'Criminal', '', null);
  // @ts-ignore
  submitted: boolean;

  constructor(private bookService: BookService, private authorService: AuthorService) {
  }

  ngOnInit(): void {
    this.getBooks();
  }

  public getBooks(): void {
    this.bookService.getBooks().subscribe((response: Book[]) => {
        this.books = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      });
  }

  onSubmit(bookIndex: string) {
    this.submitted = true;
    let id: any;
    console.log(this.books.length + " book length");
    if (this.books.length < 9) {
      // @ts-ignore
      id = bookIndex.substr(0, 1) - 1;
      console.log("weszlo do tym przed 10 " + id)
    } else {
      // @ts-ignore
      id = bookIndex.substr(0, 2) - 1;
      console.log("weszlo do tym po 10 " + id)
    }
    let book: Book = this.books[id]

    this.bookService.deleteBookById(book.id).subscribe((response: void) => {
        console.log("removed book " + book.name);
        window.location.reload();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      });
  }
}
