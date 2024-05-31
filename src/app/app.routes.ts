import { Routes } from '@angular/router';
import { QuestionComponent } from './pages/question/question.component';
import { QuestionNewComponent } from './pages/question/question-new/question-new.component';
import { QuestionViewComponent } from './pages/question/question-view/question-view.component';

export const routes: Routes = [
    {
        component: QuestionComponent,
        path:"questoes",
    },
    {
        component: QuestionViewComponent,
        path: "questoes/:id"
    }
];
