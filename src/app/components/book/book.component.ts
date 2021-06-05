import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {NgForm} from "@angular/forms";
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
  message: any;
  // @ts-ignore
  books: Book[];
  // @ts-ignore
  genres: string[];
  // @ts-ignore
  authors: Author[];
  photoUrl: string;
  // @ts-ignore
  bookModel = new Book(new Author('Jakis tam gosc', 'Kamil', 'Borowik', ''), 'Criminal', '', null);
  // @ts-ignore
  authorModel = new Author('Bandyta dziary na pol ryja', 'Nowak', 'Nowacki', null);

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
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      });
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

  addBook(value: string) {
    this.message = "Dodano ksiazke " + value;
  }


  public onAddBook(addForm: NgForm): void {
    //document.getElementById().click();
    this.bookService.addBook(addForm.value).subscribe(
      (response: Book) => {
        console.log()
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    )
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
}
