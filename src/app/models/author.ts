export class Author {

  constructor(
    public id : number,
    public bibliography: string,
    public firstName: string,
    public lastName: string,
    public secondName?: string,
  ) {
  }
}
