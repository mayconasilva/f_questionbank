import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../services/question.service';
import { QuestionResponse } from '../../data/question';
import { QuestionApiResponse } from '../../data/apiResponse';
import { CommonModule } from '@angular/common';
import { QuestionNewComponent } from './question-new/question-new.component';

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [CommonModule, QuestionNewComponent],
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  questionApiResponse: QuestionApiResponse | undefined;
  questions: QuestionResponse[] = [];
  totalPages: number = 0;
  currentPage: number = 0;

  constructor(private questionService: QuestionService) {}

  ngOnInit(): void {
    this.getAllQuestions();
  }

  getAllQuestions(): void {
    try {
      this.questionService.getAllQuestion().subscribe((response: QuestionApiResponse) => {
        // Atualiza a lista de perguntas
        this.questions = response.content;
        // Atualiza informações de paginação
        this.totalPages = response.totalPages;
        this.currentPage = response.number;
      });
      console.log("Request for All Questions"); 
    } catch {
      console.log("An error occurred");
    }
  }  

  refreshPage() {
    window.location.reload();
}

  
}
