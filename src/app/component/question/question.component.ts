import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Question, Response} from "./question.model";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit{
  @Input() number: number = 1;
  @Input() question: Question = {} as Question;
  @Output() scoreEmitter = new EventEmitter<number>();

  public numberOfCorrect = 0;


  public questionForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.questionForm = this.fb.group({
      choices: new FormControl([])
    });
  }

  ngOnInit() {
    this.numberOfCorrect = this.question.response.filter(response => response.isCorrect).length;

    this.questionForm.get('choices')?.valueChanges
      .subscribe((value: Response[]) => {

        this.scoreEmitter.emit(this.calculateScore(value));
      });
  }

  calculateScore(selectedResponses: Response[]): number {
    let score = 0;

    selectedResponses.forEach(selectedResponse => {
      if (selectedResponse.isCorrect) {
        score++;
      }
      else {
        score--;
      }
    });
    if (score> 0) {
      return score/this.numberOfCorrect
    }

    return 0;
  }
}
