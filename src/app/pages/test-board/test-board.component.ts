import { Component, OnInit } from '@angular/core';
import { TestBoardNewComponent } from './test-board-new/test-board-new.component';
import { TestBoardResponse } from '../../data/testBoard';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TestBoardApiResponse } from '../../data/apiResponse';
import { TestBoardService } from '../../services/test-board.service';
import { HttpResponse } from '@angular/common/http';
import { response } from 'express';

@Component({
  selector: 'app-test-board',
  standalone: true,
  imports: [TestBoardNewComponent, RouterModule, CommonModule],
  templateUrl: './test-board.component.html',
  styleUrl: './test-board.component.scss'
})
export class TestBoardComponent implements OnInit{
  testBoards: TestBoardResponse[] = [];
  totalPages = 0;
  currentPage = 0;
  isModalOpen: boolean = false;
  selectedQuestion: TestBoardResponse | null = null;

  ngOnInit(): void {
    this.getAllTestBoards()
  }

  constructor(private testBoardService: TestBoardService){}

  getAllTestBoards(): void {
    this.testBoardService.getAllTestBoard().subscribe((response: HttpResponse<TestBoardApiResponse>) => {
      if (response.body) {
        // Atualiza a lista de perguntas
        this.testBoards = response.body.content;
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

  openModal(testBoard: TestBoardResponse): void {
    this.selectedQuestion = testBoard;
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
