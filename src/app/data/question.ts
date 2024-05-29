import { TestBoardResponse } from "../data/testBoard";
import { AreaOfKnowledgeEnum } from "../enums/areaOfKnowledge";

export interface QuestionResponse {
  questionId: number;
  questionTitle: string;
  questionYear: Date;
  testBoard: TestBoardResponse[];
  areaOfKnowledge: AreaOfKnowledgeEnum;
  discipline: string;
  content: string;
  statement: string;
  answer: string;
  solution: string;
  createdDate: Date;
  lastModifiedDate: Date;
}

export interface QuestionRequest {
  questionTitle: string;
  questionYear: Date;
  testBoard: string;
  areaOfKnowledge: string;
  discipline: string;
  content: string;
  statement: string;
  answer: string;
  solution: string;
}

