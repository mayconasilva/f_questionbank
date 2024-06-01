import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../services/question.service';
import { QuestionResponse } from '../../data/question';
import { QuestionApiResponse } from '../../data/apiResponse';
import { HttpResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { QuestionNewComponent } from './question-new/question-new.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [CommonModule, QuestionNewComponent, RouterModule],
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  questionApiResponse: QuestionApiResponse | undefined;
  questions: QuestionResponse[] = [];
  totalPages: number = 0;
  currentPage: number = 0;
  isModalOpen: boolean = false;
  selectedQuestion: QuestionResponse | null = null;

  constructor(private questionService: QuestionService) {}

  ngOnInit(): void {
    this.getAllQuestions();
  }

  getAllQuestions(): void {
    this.questionService.getAllQuestion().subscribe((response: HttpResponse<QuestionApiResponse>) => {
      if (response.body) {
        // Atualiza a lista de perguntas
        this.questions = response.body.content;
        // Atualiza informações de paginação
        this.totalPages = response.body.totalPages;
        this.currentPage = response.body.number;
      }
      this.handleResponseMessage(response);
    }, (error) => {
      this.handleResponseMessage(error);
      console.error("An error occurred while fetching questions", error);
    });
  }  

  refreshPage() {
    window.location.reload();
  }

  openModal(question: QuestionResponse): void {
    this.selectedQuestion = question;
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedQuestion = null;
  }

  handleResponseMessage(response: HttpResponse<any> | any): void {
    if (response instanceof HttpResponse) {
      console.log("Mensagem de sucesso:", response.status, response.statusText);
      if (response.body && response.body.message) {
        console.log("Mensagem:", response.body.message);
      }
    } else {
      console.log("Mensagem de erro:", response.status, response.statusText);
      if (response.error && response.error.message) {
        console.log("Mensagem de erro:", response.error.message);
      }
    }
  }  
}
