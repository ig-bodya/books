import { Component, OnInit } from '@angular/core';
import { BooksService } from "../../services/books.service";
import { Book } from "../../models/book";

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss']
})
export class BooksListComponent implements OnInit {

  books: Book[];
  searchText = '';

  constructor(private bookService: BooksService) {
  }

  ngOnInit(): void {
    this.bookService.getBooksList().subscribe(result => {
      this.books = result;
      this.sortBooksByTitle();
    });
  }

  sortBooksByTitle(): void {
    this.books = this.books.sort((a, b) => (
      a.title.localeCompare(b.title, undefined, {
        numeric: true,
        sensitivity: 'base'
      })))
  }

  sortBooksByPageCount(): void {
    this.books = this.books.sort((a, b) => ((a.pageCount > b.pageCount) ? 1 : -1)
    )
  }

  sortBooksByDate(): void {
    this.books = this.books.sort((a, b) => ((a.publishDate > b.publishDate) ? 1 : -1)
    )
  }
}
