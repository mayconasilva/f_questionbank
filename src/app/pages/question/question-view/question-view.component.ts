import { Component, OnInit } from '@angular/core';
import { QuestionResponse } from '../../../data/question';
import { ModalComponent } from '../../../components/modal/modal.component';
import { QuestionService } from '../../../services/question.service';

@Component({
  selector: 'app-question-view',
  standalone: true,
  imports: [],
  templateUrl: './question-view.component.html',
  styleUrl: './question-view.component.scss'
})
export class QuestionViewComponent implements OnInit {
  questionId: string = '1';
  question: QuestionResponse | undefined;

  ngOnInit(): void {
    this.getQuestion();
  }

  constructor(private questionService: QuestionService){
    this.questionService = questionService
  }


  getQuestion(){
    try {
      this.questionService.getQuestion(this.questionId).subscribe((response: QuestionResponse) => {
       this.question = response;
      });
      console.log("Request question");
    } catch {
      console.log("An error occurred");
    }
  }

}
