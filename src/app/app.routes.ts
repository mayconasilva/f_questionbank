import { Routes } from '@angular/router';
import { QuestionComponent } from './pages/question/question.component';
import { QuestionNewComponent } from './pages/question/question-new/question-new.component';

export const routes: Routes = [
    {
        component: QuestionComponent,
        path:"questoes"
    }
];
