import {Component, OnInit} from '@angular/core';
import {Questionnaire} from "../shared/model/question.model";
import {HomeService} from "../shared/service/home.service";
import {take} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  questionnaires: Questionnaire[] = [];
  displayedQuestions: Questionnaire[] = [];
  searchFilter: string = "";

  constructor(
    private homeService: HomeService,
    private router: Router,
    ) {
  }

  ngOnInit(): void {
    this.initQuestionnaire();
  }

  onChange(): void {
    this.displayedQuestions = this.questionnaires.filter((question: Questionnaire) => {
      return question.title.includes(this.searchFilter);
    })
  }

  initQuestionnaire(): void {
    this.homeService.getQuestionnaire()
      .pipe(take(1))
      .subscribe((data: Questionnaire[]) => {
        this.questionnaires = data;
        this.displayedQuestions = data;
        this.homeService.lastIdQuestionnaire = this.questionnaires[this.questionnaires.length-1].questionnaireId;
      });
  }

  goToQuestionnaire(questionnaireId: number) {
    this.router.navigate(['/quiz', questionnaireId]);
  }

  createQuestionnaire(questionnaire: Questionnaire) {
    this.homeService.createQuestionnaire(questionnaire).subscribe(() => {
      this.questionnaires.push(questionnaire);
    });
  }

}
