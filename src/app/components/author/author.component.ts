import {Component, OnInit} from '@angular/core';
import {BookService} from "../../services/book/book.service";
import {AuthorService} from "../../services/author/author.service";
import {Author} from "../../models/author";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {
  authorModel = new Author(14325, '', '', '', undefined);

  constructor(private bookService: BookService, private authorService: AuthorService) {
  }

  ngOnInit(): void {
  }

  public addNewAuthorModel(): void {
    this.authorService.addAuthor(this.authorModel).subscribe(
      (response: Author) => {
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  };

  onSubmit() {
    this.addNewAuthorModel();
    window.location.reload();
  }
}
