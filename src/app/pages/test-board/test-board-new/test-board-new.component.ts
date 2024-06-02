import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalComponent } from '../../../components/modal/modal.component';
import { TestBoardService } from '../../../services/test-board.service';
import { QuestionService } from '../../../services/question.service';
import { TestBoardRequest } from '../../../data/testBoard';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-test-board-new',
  standalone: true,
  imports: [ReactiveFormsModule, ModalComponent],
  templateUrl: './test-board-new.component.html',
  styleUrl: './test-board-new.component.scss'
})
export class TestBoardNewComponent {
  testBoardForm: FormGroup;
  isModalVisible: boolean = false;

  constructor(private fb: FormBuilder, private testBoardService: TestBoardService, private questionService: QuestionService){
    this.testBoardForm = this.fb.group({
      testBoardAcronym: ['', Validators.required],
      testBoardName: ['', Validators.required]
    })
  }

  openModal(): void {
    this.isModalVisible = true;
  }

  closeModal(): void {
    this.isModalVisible = false;
  }

  onSubmit(): void {
    if (this.testBoardForm.valid) {
      const newTestBoard: TestBoardRequest = this.testBoardForm.value;
      console.log('Nova Banca Examinadora:', newTestBoard);
      this.saveTestBoard(newTestBoard);
      this.closeModal();
    } else {
      console.log("Formulário inválido");
    }
  }

  saveTestBoard(newTestBoard:TestBoardRequest): void {
    this.testBoardService.createTestBoard(newTestBoard).subscribe((response: HttpResponse<any>) => {
      if (response.body) {
        console.log('Nova questão criada:', response.body);
      }
      this.handleResponseMessage(response);
    
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
