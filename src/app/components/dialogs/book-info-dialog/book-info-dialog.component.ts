import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Book } from "../../../models/book";

@Component({
  selector: 'app-book-info-dialog',
  templateUrl: './book-info-dialog.component.html',
  styleUrls: ['./book-info-dialog.component.scss']
})
export class BookInfoDialogComponent implements OnInit {

  book: Book;

  constructor( @Inject(MAT_DIALOG_DATA) data: Book) {
    this.book = data;
  }

  ngOnInit(): void {
  }

}
