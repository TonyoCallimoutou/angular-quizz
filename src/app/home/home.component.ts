import {Component, OnInit} from '@angular/core';
import {Question} from "../component/question/question.model";
import {HomeService} from "./home.service";
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
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
        title: [question.title],
        response: [question.response],
        selectedResponse: null
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

  obtainResult(index: number, score: number) {
    console.log(index);
    console.log(score)
  }

  test() {
    console.log(this.quizForm)
  }

}
