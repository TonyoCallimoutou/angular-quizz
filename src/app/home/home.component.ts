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

  constructor(
    private homeService: HomeService,
    private router: Router,
    ) {
  }

  ngOnInit(): void {
    this.initQuestionnaire();
  }

  initQuestionnaire(): void {
    this.homeService.getQuestionnaire()
      .pipe(take(1))
      .subscribe((data: Questionnaire[]) => {
        this.questionnaires = data;
      });
  }

  goToQuestionnaire(questionnaireId: number) {
    this.router.navigate(['/quiz', questionnaireId]);
  }

}
