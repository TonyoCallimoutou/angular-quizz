import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Questionnaire} from "../../model/question.model";
import { HomeService } from '../../service/home.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.scss']
})
export class QuestionnaireComponent {

  @Input() questionnaire!: Questionnaire;
  @Input() questions!: Questionnaire[];
  @Output() goToQuestionnaire : EventEmitter<number> = new EventEmitter<number>();

  categoryName: string = "";

  constructor(private homeService: HomeService,private router: Router) {}

  createQuestionnaire() {
    const questionnaire : Questionnaire = {
      "title": this.categoryName,
      "questionnaireId": this.homeService.lastIdQuestionnaire
    }      
    
    this.homeService.createQuestionnaire(questionnaire).subscribe(() => {
      this.questions = [...this.questions,questionnaire];
    });
  }

}
