import {Component, OnInit} from '@angular/core';
import {Question, Response} from "../component/question/question.model";
import {HomeService} from "./home.service";
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {take} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public questions: Question[] = [];

  public quizForm : FormGroup;
  public questionArray: FormArray;
  public score: number = 0;

  constructor(
    private homeService: HomeService,
    private fb : FormBuilder
    ) {
    this.quizForm = this.fb.group({
      questions: this.fb.array([])
    });

    this.questionArray = this.quizForm.get('questions') as FormArray;
  }

  initQuestions() {
    this.questions.forEach((question) => {
      const questionGroup = this.fb.group({
        text: [question.text],
        response: [question.response],
        selectedResponse: [null, Validators.required]
      });
      this.questionArray.push(questionGroup);
    });
  }

  ngOnInit(): void {
    this.initQuestionnaire();
  }

  initQuestionnaire(): void {
    this.homeService.getFakeData()
      .pipe(take(1))
      .subscribe((data: any) => {
      this.questions = data;
      this.initQuestions();
    });
  }

  getSelectedResponseControl(form : AbstractControl) {
    return form.get('selectedResponse');
  }

  getReponseControl(form : AbstractControl) {
    return form.get('response');
  }

  submit() {
    this.score = 0
    this.questionArray.controls.forEach((questionGroup) => {
      const selectedResponse = this.getSelectedResponseControl(questionGroup)?.value;
      const responses = this.getReponseControl(questionGroup)?.value;
      if (selectedResponse && responses) {
        this.score += this.calculateScore(responses, selectedResponse);
      }
    });
  }

  calculateScore(response : Response[], selectedResponses: Response[]): number {
    const numberOfCorrect = response.filter(response => response.isCorrect).length;

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
      return score / numberOfCorrect
    }

    return 0;
  }

}
