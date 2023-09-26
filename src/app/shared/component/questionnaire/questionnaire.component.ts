import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Questionnaire} from "../../model/question.model";

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.scss']
})
export class QuestionnaireComponent {

  @Input() questionnaire!: Questionnaire;
  @Output() goToQuestionnaire : EventEmitter<number> = new EventEmitter<number>();

  constructor() {

  }
  test() {
    console.log('ajouter un formulaire pour creer un questionnaire');
  }

}
