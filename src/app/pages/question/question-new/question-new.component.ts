import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalComponent } from '../../../components/modal/modal.component';
import { TestBoardApiResponse } from '../../../data/apiResponse';
import { TestBoardService } from '../../../services/test-board.service';
import { TestBoardResponse } from '../../../data/testBoard';
import { AreaOfKnowledgeDetails, AreaOfKnowledgeDetailsMap, AreaOfKnowledgeEnum } from '../../../enums/areaOfKnowledge';
import { TrixEditorModule } from '../../../modules/trix-editor/trix-editor.module';
import { QuestionService } from '../../../services/question.service';
import { QuestionRequest, QuestionResponse } from '../../../data/question';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-question-new',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ModalComponent, TrixEditorModule],
  templateUrl: './question-new.component.html',
  styleUrls: ['./question-new.component.scss']
})
export class QuestionNewComponent implements OnInit {
  isModalVisible: boolean = false;
  questionForm: FormGroup;
  testBoardApiResponse: TestBoardApiResponse | undefined;
  testBoard: TestBoardResponse[] = [];
  totalPages: number = 0;
  currentPage: number = 0;
  areaOfKnowledgeOptions: { key: string; value: AreaOfKnowledgeDetails; }[] = [];
  selectedArea: AreaOfKnowledgeEnum | undefined;
  text: string = 'Digite o seu texto aqui...';

  constructor(private fb: FormBuilder, private testBoardService: TestBoardService, private questionService: QuestionService) {
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
      console.error("An error occurred while fetching test boards:", error);
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
      const newQuestion: QuestionRequest = this.questionForm.value;
      console.log('Nova questão:', newQuestion);
      this.saveQuestion(newQuestion);
      this.closeModal();
    } else {
      console.log("Formulário inválido");
    }
  }

  saveQuestion(newQuestion: QuestionRequest): void {
    this.questionService.createQuestion(newQuestion).subscribe((response: HttpResponse<any>) => {
      if (response.body) {
        console.log('Nova questão criada:', response.body);
      }
      this.handleResponseMessage(response);
      // Atualiza a lista de perguntas após adicionar uma nova questão
      this.closeModal();
    }, (error) => {
      this.handleResponseMessage(error);
      console.error("An error occurred while saving the question:", error);
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
