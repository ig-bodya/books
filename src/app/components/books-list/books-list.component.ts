import { Component, OnInit } from '@angular/core';
import { BooksService } from "../../services/books.service";
import { Book } from "../../models/book";
import * as XLSX from 'xlsx'
import { MatDialog } from "@angular/material/dialog";
import { displayBookDialog } from "../../utils/dialog-utils.config";
import { BookInfoDialogComponent } from "../dialogs/book-info-dialog/book-info-dialog.component";
import { ReplaySubject, scan } from "rxjs";

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
  replaySubSource = new ReplaySubject<any>(2);
  replaySub$ = this.replaySubSource.pipe(
    scan((acc: any, curr: any) => {
      acc.push(curr);
      return acc.slice(-2);
    }, [])
  );

  constructor(private bookService: BooksService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.bookService.getBooksList().subscribe(result => {
      this.books = result;
      this.sortBooksByTitle();
      this.processSorting('title');
      this.sort('title');
    });
  }

  processSorting(category: string): void {
    this.replaySub$.subscribe(val => {
      if ( val.length === 2 && val[0] === val[1] ) {
        this.books.reverse();
      } else {
        if ( category === 'title' ) {
          this.sortBooksByTitle();
        } else {
          this.books = this.books.sort((a: any, b: any) => ((a[category] > b[category]) ? 1 : -1));
        }
      }
    })
  }

  sortBooksByTitle(): void {
    this.books = this.books.sort((a, b) => (
      a.title.localeCompare(b.title, undefined, {
        numeric: true,
        sensitivity: 'base'
      })))
  }

  sort(category: string): void {
    this.replaySubSource.next(category);
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
    let element = document.getElementById('books');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1');
    XLSX.writeFile(wb, this.fileName)
  }

  openBookInfo(book: Book): void {
    this.dialog.open(BookInfoDialogComponent, displayBookDialog(book));
  }
}
