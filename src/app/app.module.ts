import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BookComponent} from './components/book/book.component';
import {HttpClientModule} from "@angular/common/http";
import {BookService} from "./services/book/book.service";
import {FormsModule} from "@angular/forms";
import {AuthorComponent} from './components/author/author.component';
import {RouterModule} from "@angular/router";
import {MainpageComponent} from './components/mainpage/mainpage.component';
import {BookListComponent} from './components/booklist/book-list.component';
import {AuthorlistComponent} from './components/authorlist/authorlist.component';
import {DatePipe} from "@angular/common";
import {AuthorService} from "./services/author/author.service";

@NgModule({
  declarations: [
    AppComponent,
    BookComponent,
    AuthorComponent,
    MainpageComponent,
    BookListComponent,
    AuthorlistComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {path: 'book', component: BookComponent},
      {path: 'author', component: AuthorComponent},
      {path: 'bookList', component: BookListComponent},
      {path: 'authorList', component: AuthorlistComponent},
    ])
  ],
  providers: [BookService, AuthorService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {
}
