import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Book } from "../models/book";

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  url = 'https://fakerestapi.azurewebsites.net/api/v1/Books'

  constructor(private httpClient: HttpClient) { }

  getBooksList(): Observable<Book[]> {
    return this.httpClient.get<Book[]>(this.url)
  }
}
