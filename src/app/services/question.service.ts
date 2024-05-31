import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QuestionRequest, QuestionResponse } from '../data/question';
import { QuestionApiResponse } from '../data/apiResponse';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private apiUrl = 'http://localhost:8080/api/question';

  constructor(private http: HttpClient) { }

  getAllQuestion(): Observable<QuestionApiResponse> {
    return this.http.get<QuestionApiResponse>(this.apiUrl + '?size=100');
  }

  createQuestion(question: QuestionRequest): Observable<QuestionRequest> {
    return this.http.post<QuestionRequest>(this.apiUrl, question);
  }

  getQuestion(id: string): Observable<QuestionResponse> {
    return this.http.get<QuestionResponse>(`${this.apiUrl}/${id}`);
  }
}
