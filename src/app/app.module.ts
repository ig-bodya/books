import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BooksListComponent } from './components/books-list/books-list.component';
import { HttpClientModule } from "@angular/common/http";
import { MatTableModule } from '@angular/material/table';
import { SearchPipe } from './pipes/search.pipe';
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    BooksListComponent,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatTableModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
