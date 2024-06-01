import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalComponent } from '../../../components/modal/modal.component';
import { TrixEditorModule } from '../../../modules/trix-editor/trix-editor.module';
import { TestBoardApiResponse } from '../../../data/apiResponse';
import { TestBoardResponse } from '../../../data/testBoard';
import { AreaOfKnowledgeDetails, AreaOfKnowledgeDetailsMap, AreaOfKnowledgeEnum } from '../../../enums/areaOfKnowledge';
import { TestBoardService } from '../../../services/test-board.service';
import { QuestionService } from '../../../services/question.service';
import { QuestionRequest, QuestionResponse } from '../../../data/question';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-question-update',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ModalComponent, FormsModule, TrixEditorModule],
  templateUrl: './question-update.component.html',
  styleUrls: ['./question-update.component.scss']
})
export class QuestionUpdateComponent implements OnInit {
  isModalVisible: boolean = false;
  questionForm: FormGroup;
  testBoardApiResponse: TestBoardApiResponse | undefined;
  testBoard: TestBoardResponse[] = [];
  totalPages: number = 0;
  currentPage: number = 0;
  areaOfKnowledgeOptions: { key: string; value: AreaOfKnowledgeDetails; }[] = [];
  selectedArea: AreaOfKnowledgeEnum | undefined;
  text: string = 'Digite o seu texto aqui...';
  questionId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private testBoardService: TestBoardService,
    private questionService: QuestionService,
    private route: ActivatedRoute
  ) {
    this.questionForm = this.fb.group({
      questionTitle: ['', Validators.required],
      questionYear: [2024, Validators.required],
      testBoard: [null, Validators.required],
      areaOfKnowledge: ['', Validators.required],
      discipline: ['', Validators.required],
      content: ['', Validators.required],
      statement: ['', Validators.required],
      answer: ['', Validators.required],
      solution: ['', Validators.required]
    });

    this.areaOfKnowledgeOptions = Object.keys(AreaOfKnowledgeEnum).map(key => ({
      key: key,
      value: AreaOfKnowledgeDetailsMap[key as AreaOfKnowledgeEnum]
    }));
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.questionId = params.get('id');
      if (this.questionId) {
        this.loadQuestionData(this.questionId);
      }
    });
    this.getAllTestBoard();
  }

  getAllTestBoard(): void {
    this.testBoardService.getAllTestBoard().subscribe((response: HttpResponse<TestBoardApiResponse>) => {
      if (response.body) {
        this.testBoard = response.body.content;
        this.totalPages = response.body.totalPages;
        this.currentPage = response.body.number;
      }
      this.handleResponseMessage(response);
    }, (error) => {
      this.handleResponseMessage(error);
      console.error("An error occurred while fetching test boards", error);
    });
  }

  loadQuestionData(id: string): void {
    this.questionService.getQuestion(id).subscribe((response: HttpResponse<QuestionResponse>) => {
      if (response.body) {
        this.questionForm.patchValue(response.body);
      }
      this.handleResponseMessage(response);
    }, (error) => {
      this.handleResponseMessage(error);
      console.error("An error occurred while loading the question", error);
    });
  }

  openModal(): void {
    this.isModalVisible = true;
  }

  closeModal(): void {
    this.isModalVisible = false;
  }

  onSubmit(): void {
    if (this.questionForm.valid) {
      const updatedQuestion: QuestionRequest = this.questionForm.value;
      if (this.questionId) {
        this.updateQuestion(this.questionId, updatedQuestion);
      } else {
        this.createQuestion(updatedQuestion);
      }
    } else {
      console.log("Formulário inválido");
    }
  }

  createQuestion(newQuestion: QuestionRequest): void {
    this.questionService.createQuestion(newQuestion).subscribe((response: HttpResponse<QuestionRequest>) => {
      console.log('Nova questão criada:', response.body);
      this.handleResponseMessage(response);
      this.closeModal();
    }, (error) => {
      this.handleResponseMessage(error);
      console.error("An error occurred while creating the question", error);
    });
  }

  updateQuestion(id: string, updatedQuestion: QuestionRequest): void {
    this.questionService.updateQuestion(id, updatedQuestion).subscribe((response: HttpResponse<QuestionRequest>) => {
      console.log('Questão atualizada:', response.body);
      this.handleResponseMessage(response);
      this.closeModal();
    }, (error) => {
      this.handleResponseMessage(error);
      this.closeModal();
      console.error("An error occurred while updating the question", error);
    });
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
