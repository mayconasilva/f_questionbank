import { QuestionResponse } from "./question";
import { TestBoardResponse } from "./testBoard";

export interface QuestionApiResponse {
  message: string;
  content: QuestionResponse[];
  totalPages: number;
  number: number;
}


export interface TestBoardApiResponse {
  content: TestBoardResponse[];
  totalPages: number;
  number: number;

}
