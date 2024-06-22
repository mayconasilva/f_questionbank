import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QuestionRequest, QuestionResponse } from '../data/question';
import { QuestionApiResponse } from '../data/apiResponse';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private apiUrl = 'http://localhost:8080/api/question';

  constructor(private http: HttpClient) {}

  getAllQuestions(page: number = 0, size: number = 10): Observable<HttpResponse<QuestionApiResponse>> {
    return this.http.get<QuestionApiResponse>(`${this.apiUrl}?page=${page}&size=${size}`, { observe: 'response' });
  }

  createQuestion(question: QuestionRequest): Observable<HttpResponse<any>> {
    return this.http.post<any>(this.apiUrl, question, { observe: 'response' });
  }

  getQuestion(id: string): Observable<HttpResponse<QuestionResponse>> {
    return this.http.get<QuestionResponse>(`${this.apiUrl}/${id}`, { observe: 'response' });
  }

  updateQuestion(id: string, question: QuestionRequest): Observable<HttpResponse<any>> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, question, { observe: 'response' });
  }

  deleteQuestion(id: string): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, { observe: 'response' });
  }
}
