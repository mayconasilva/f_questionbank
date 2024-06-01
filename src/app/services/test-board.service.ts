import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TestBoardApiResponse } from '../data/apiResponse';

@Injectable({
  providedIn: 'root'
})
export class TestBoardService {
  private apiUrl = 'http://localhost:8080/api/test-board';

  constructor(private http: HttpClient) {}

  getAllTestBoard(): Observable<HttpResponse<TestBoardApiResponse>> {
    return this.http.get<TestBoardApiResponse>(this.apiUrl, { observe: 'response' });
  }
}
