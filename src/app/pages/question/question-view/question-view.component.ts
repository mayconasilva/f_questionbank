import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { QuestionResponse } from '../../../data/question';
import { QuestionService } from '../../../services/question.service';
import { AreaOfKnowledgeDetailsMap, AreaOfKnowledgeEnum } from '../../../enums/areaOfKnowledge';
import { QuestionUpdateComponent } from '../question-update/question-update.component';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-question-view',
  standalone: true,
  imports: [QuestionUpdateComponent],
  templateUrl: './question-view.component.html',
  styleUrls: ['./question-view.component.scss']
})
export class QuestionViewComponent implements OnInit {
  questionId!: string;
  question!: QuestionResponse;

  constructor(
    private questionService: QuestionService,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.questionId = params.get('id')!;
      this.getQuestion();
    });
  }

  getQuestion(): void {
    this.questionService.getQuestion(this.questionId).subscribe(
      (response: HttpResponse<QuestionResponse>) => {
        if (response.body) {
          this.question = response.body;
        }
        this.handleResponseMessage(response);
      },
      (error) => {
        this.handleResponseMessage(error);
        console.error('Erro ao buscar a questão:', error);
      }
    );
  }

  sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  getAreaName(key: AreaOfKnowledgeEnum): string {
    return AreaOfKnowledgeDetailsMap[key]?.areaName || 'Área desconhecida';
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
