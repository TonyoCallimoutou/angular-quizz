import {Component, OnInit} from '@angular/core';
import {Question, Response} from "../../shared/model/question.model";
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {HomeService} from "../../shared/service/home.service";
import {take} from "rxjs";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  public questions: Question[] = [];

  public quizForm : FormGroup;
  public questionArray: FormArray;
  public score: number = 0;

  private questionnaireId: number = 0;

  constructor(
    private homeService: HomeService,
    private route : ActivatedRoute,
    private fb : FormBuilder,
  ) {
    this.quizForm = this.fb.group({
      questions: this.fb.array([])
    });

    this.questionArray = this.quizForm.get('questions') as FormArray;
  }

  ngOnInit(): void {
    this.questionnaireId = this.route.snapshot.paramMap.get('id') ? parseInt(this.route.snapshot.paramMap.get('id') as string) : 0;
    this.initQuestionnaire();
  }

  initQuestions() {
    this.questions.forEach((question) => {
      this.questionArray.push(new FormControl([], Validators.required));
    });
  }

  initQuestionnaire(): void {
    this.homeService.getQuestion(this.questionnaireId)
      .pipe(take(1))
      .subscribe((data: Question[]) => {
        this.questions = data;
        this.initQuestions();
      });
  }

  getFormControlQuestion(form : AbstractControl) {
    return form as FormControl;
  }

  submit() {
    this.homeService.getResponse(this.questionnaireId)
      .pipe(take(1))
      .subscribe((data: Response[]) => {
        this.score = this.homeService.getScoreResult(this.questionArray, data);
      });
  }
}
