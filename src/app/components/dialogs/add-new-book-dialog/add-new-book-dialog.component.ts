import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-new-book-dialog',
  templateUrl: './add-new-book-dialog.component.html',
  styleUrls: ['./add-new-book-dialog.component.scss']
})
export class AddNewBookDialogComponent implements OnInit {

  myForm: FormGroup;
  number = '';

  constructor(private dialogRef: MatDialogRef<AddNewBookDialogComponent>,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.setDefaultForm();
  }

  setDefaultForm(): void {
    this.myForm = this.fb.group({
      title: new FormControl('', Validators.required),
      pageCount: new FormControl('', Validators.required),
      publishDate: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      excerpt: new FormControl(''),
    });
  }

  send(): void {
    this.myForm.markAllAsTouched();
    if (!this.myForm.invalid) {
      this.dialogRef.close(this.myForm.value);
    }
  }

  get title(): any {
    return this.myForm.get('title');
  }

  get pageCount(): any {
    return this.myForm.get('pageCount');
  }

  get publishDate(): any {
    return this.myForm.get('publishDate');
  }

  get description(): any {
    return this.myForm.get('description');
  }
}
