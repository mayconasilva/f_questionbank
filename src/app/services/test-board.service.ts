import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TestBoardApiResponse } from '../data/apiResponse';
import { TestBoardRequest, TestBoardResponse } from '../data/testBoard';

@Injectable({
  providedIn: 'root'
})
export class TestBoardService {
  private apiUrl = 'http://localhost:8080/api/test-board';

  constructor(private http: HttpClient) {}

  getAllTestBoard(): Observable<HttpResponse<TestBoardApiResponse>> {
    return this.http.get<TestBoardApiResponse>(this.apiUrl, { observe: 'response' });
  }
  createTestBoard(testBoard: TestBoardRequest): Observable<HttpResponse<TestBoardRequest>> {
    return this.http.post<TestBoardRequest>(this.apiUrl, testBoard, { observe: 'response' });
  }

  getTestBoard(id: string): Observable<HttpResponse<TestBoardResponse>> {
    return this.http.get<TestBoardResponse>(`${this.apiUrl}/${id}`, { observe: 'response' });
  }

  updateTestBoard(id: string, testBoard: TestBoardRequest): Observable<HttpResponse<TestBoardRequest>> {
    return this.http.put<TestBoardRequest>(`${this.apiUrl}/${id}`, testBoard, { observe: 'response' });
  }
}
