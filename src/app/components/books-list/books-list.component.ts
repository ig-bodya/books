import { Component, OnInit } from '@angular/core';
import { BooksService } from "../../services/books.service";
import { Book } from "../../models/book";
import * as XLSX from 'xlsx'
import { MatDialog } from "@angular/material/dialog";
import { displayBookDialog } from "../../utils/dialog-utils.config";
import { BookInfoDialogComponent } from "../dialogs/book-info-dialog/book-info-dialog.component";

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss']
})
export class BooksListComponent implements OnInit {

  selectedColor = '#ADD8E6';
  defaultColor = '#fff'
  books: Book[];
  searchText = '';
  fileName = 'BooksSheet.xlsx'

  constructor(private bookService: BooksService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.bookService.getBooksList().subscribe(result => {
      this.books = result;
      this.sortBooksByTitle();
    });
  }

  sort(params: string): void {
    if (params === 'title') {
      this.sortBooksByTitle()
    } else {
      this.books = this.books.sort((a: any, b: any) => ((a[params] > b[params]) ? 1 : -1));
    }
  }


  sortBooksByTitle(): void {
    this.books = this.books.sort((a, b) => (
      a.title.localeCompare(b.title, undefined, {
        numeric: true,
        sensitivity: 'base'
      })))
  }

  checkBook(item: Book): void {
    if ( item.isClicked ) {
      item.isClicked = false;
    } else {
      this.uncheckBook();
      item.isClicked = true;
    }
  }

  uncheckBook(): void {
    this.books.forEach(book => {
      book.isClicked = false;
    });
  }

  exportExcel(): void {
    let element  = document.getElementById('books');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb:XLSX.WorkBook =XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb,ws,'Sheet 1');
    XLSX.writeFile(wb, this.fileName)
  }

  openBookInfo(book: Book): void {
    this.dialog.open(BookInfoDialogComponent, displayBookDialog(book));
  }
}
