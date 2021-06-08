import {Component, OnInit} from '@angular/core';
import {Book} from "../../models/book";
import {Author} from "../../models/author";
import {BookService} from "../../services/book/book.service";
import {AuthorService} from "../../services/author/author.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-edit-author',
  templateUrl: './edit-author.component.html',
  styleUrls: ['./edit-author.component.css']
})
export class EditAuthorComponent implements OnInit {
  // @ts-ignore
  authors: Author[];
  // @ts-ignore
  authorModel = new Author(1, '', '', '', '');
  // @ts-ignore
  submitted: boolean;

  constructor(private bookService: BookService, private authorService: AuthorService) {
  }

  ngOnInit(): void {
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

  onSubmit(authorIndex: string) {
    this.submitted = true;
    let id: any;
    if (this.authors.length < 9) {
      // @ts-ignore
      id = authorIndex.substr(0, 1) - 1;
    } else {
      // @ts-ignore
      id = authorIndex.substr(0, 2) - 1;
    }
    let author: Author = this.authors[id]

    this.authorService.deleteAuthor(author.id).subscribe((response: void) => {
        window.location.reload();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      });
  }
}
