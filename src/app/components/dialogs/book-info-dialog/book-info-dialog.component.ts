import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Book } from "../../../models/book";

@Component({
  selector: 'app-book-info-dialog',
  templateUrl: './book-info-dialog.component.html',
  styleUrls: ['./book-info-dialog.component.scss']
})
export class BookInfoDialogComponent implements OnInit {

  book: Book;

  constructor(private dialogRef: MatDialogRef<BookInfoDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data: Book) {
    this.book = data;
  }

  ngOnInit(): void {
  }

  edit(id: string): void {
    let elem = document.getElementById(`${id}`) as HTMLInputElement;
    elem.removeAttribute('readonly');
    elem.setSelectionRange(elem.value.length, elem.value.length);
    elem.focus();
  }

  close(): void {
    this.dialogRef.close();
  }
}
