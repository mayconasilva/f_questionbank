import { QuestionResponse } from "./question";
import { TestBoardResponse } from "./testBoard";

export interface QuestionApiResponse {
    content: QuestionResponse[];
    totalPages: number;
    number: number;

  }
  
  
export interface TestBoardApiResponse {
  content: TestBoardResponse[];
  totalPages: number;
  number: number;

}
