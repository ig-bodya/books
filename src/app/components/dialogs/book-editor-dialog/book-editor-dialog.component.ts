import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Book } from "../../../models/book";

@Component({
  selector: 'app-book-editor-dialog',
  templateUrl: './book-editor-dialog.component.html',
  styleUrls: ['./book-editor-dialog.component.scss']
})
export class BookEditorDialogComponent {

  book: any;
  editing: boolean = false;

  constructor(private dialogRef: MatDialogRef<BookEditorDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data: Book) {
    this.book = data;
  }

  edit(value: string, id: string): void {
    if (value === 'publishDate') {
      let datepicker = document.getElementById(`${value}`) as HTMLInputElement;
      datepicker.removeAttribute('readonly')
      datepicker.focus();
    } else {
      let textarea = document.getElementById(`${value}`) as HTMLInputElement;
      textarea.removeAttribute('readonly');
      textarea.setSelectionRange(textarea.value.length, textarea.value.length);
      textarea.focus();
    }
    this.editing = true;
    this.changeButtonIcon(id, 'done');
  }

  close(): void {
    this.dialogRef.close();
  }

  save(value: any, id: string): void {
    if (value === 'publishDate') {
      let datepicker = document.getElementById(`${value}`) as HTMLInputElement;
      this.book[value] = new Date(datepicker.value);
    } else {
      let textarea = document.getElementById(`${value}`) as HTMLInputElement;
      this.book[value] = textarea.value;
    }
    this.editing = false;
    this.changeButtonIcon(id, 'edit');
  }

  changeButtonIcon(id: string, iconName: string): void {
    let editButton = document.getElementById(`${id}`) as HTMLElement;
    editButton.innerText = iconName;
  }

  formatDate(date: Date): string {
    let day, month, year;
    let published = new Date(date);

    day = published.getDate();
    month = published.getMonth() + 1;
    year = published.getFullYear();
    day = day.toString().padStart(2, '0');
    month = month.toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  }
}
