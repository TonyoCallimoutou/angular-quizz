import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Question, Response} from "../../model/question.model";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit{
  @Input() number: number = 1;
  @Input() question: Question = {} as Question;
  @Input() quizFormControl!: FormControl;

  constructor() {
  }

  ngOnInit() {
  }

}
