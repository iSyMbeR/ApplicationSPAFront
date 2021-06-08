import {Author} from "./author";

export class Book {

  constructor(
    public id: number,
    public author: Author,
    public bookGenre: string,
    public name: string,
    public releaseDate: Date,
  ) {
  }

}
