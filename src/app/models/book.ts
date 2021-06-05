import {Author} from "./author";

export class Book {

  constructor(
    public author: Author,
    public bookGenre: string,
    public name: string,
    public releaseDate: Date,
  ) {
  }

}
