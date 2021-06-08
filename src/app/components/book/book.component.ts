import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {BookService} from "../../services/book/book.service";
import {Book} from "../../models/book";
import {Author} from "../../models/author";
import {AuthorService} from "../../services/author/author.service";

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  hidden: boolean = true;
  // @ts-ignore
  books: Book[];
  // @ts-ignore
  genres: string[];
  // @ts-ignore
  authors: Author[];
  photoUrl: string;
  // @ts-ignore
  bookModel = new Book(105, new Author(1, '', '', '', ''), 'Criminal', '', null);
  authorModel = new Author(105, '', '', '', undefined);
  // @ts-ignore
  submitted: boolean;

  constructor(private bookService: BookService, private authorService: AuthorService) {
    this.photoUrl = 'https://www.google.pl/url?sa=i&url=https%3A%2F%2Fcommons.wikimedia.org%2Fwiki%2FFile%3AOpen_book_nae_02.svg&psig=AOvVaw11vu6nx0suIxVlpSo4SHZ2&ust=1622138124402000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCPDk-cn15_ACFQAAAAAdAAAAABAD';
  }

  ngOnInit(): void {
    this.getBooks();
    this.getGenres();
    this.getAuthors();
  }

  public getAuthors(): void {
    this.authorService.getAuthors().subscribe((response: Author[]) => {
        this.authors = response;
        console.log(this.authors[0].firstName + " tutaj");
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      });
  }

  public isAuthorSelected(value: string): boolean {
    let result: boolean = false;
    this.authors.forEach(el => {
      if (el.firstName === value)
        result = true;
    });
    return result;
  }

  public getGenres(): void {
    this.bookService.getGenres().subscribe((response: string[]) => {
        this.genres = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      });
  }

  public getBooks(): void {
    this.bookService.getBooks().subscribe((response: Book[]) => {
        this.books = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      });
  }

  public updateBookModelAuthorParam(firstname: string): Author {
    let selectedAuthor: Author;
    this.authors.forEach(el => {
      // @ts-ignore
      if (el.firstName === this.bookModel.author) {
        selectedAuthor = el;
      }
    });
    // @ts-ignore
    return selectedAuthor;
  }


  public getSelectedAuthor(firstname: string, lastName?: string): void {
    this.authorService.findAuthorByName(firstname).subscribe(
      (response: Author) => {
        this.authorModel = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onUpdateBook(book: Book): void {
    this.bookService.updateBook(book).subscribe(
      (response: Book) => {
        console.log(response);
        this.getBooks();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  onSubmit() {
    this.submitted = true;
    let authorFirstName: any = this.bookModel.author;
    this.bookModel.author = this.updateBookModelAuthorParam(authorFirstName);

    this.bookService.addBook(this.bookModel).subscribe(
      (response: Book) => {
        console.log(response);
        this.getBooks();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
    window.location.reload()
  }

  public addAuthorForm() {
    this.hidden = !this.hidden;
    // @ts-ignore
    document.getElementById("authorForm").hidden = this.hidden;
  }
}
