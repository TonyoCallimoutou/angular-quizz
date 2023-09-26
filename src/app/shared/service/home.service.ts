import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Response} from "../model/question.model";
import {FormArray} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private baseUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) {}

  getQuestion(questionId: number): Observable<any> {
    return this.http.get(this.baseUrl + 'questions' + '?questionnaireId=' + questionId);
  }

  getResponse(questionId: number): Observable<any> {
    return this.http.get(this.baseUrl + 'responses' + '?questionnaireId=' + questionId);
  }

  getQuestionnaire(): Observable<any> {
    return this.http.get(this.baseUrl + 'questionnaire');
  }

  getScoreResult(questionArray : FormArray, correctResponse : Response[]): number {
    let score = 0;
    questionArray.controls.forEach((questionGroup) => {
      const selectedResponse : Response[] = questionGroup.value.userChoices;
      const responses =  correctResponse.find(response => response.questionId === selectedResponse[0].questionId);
      if (selectedResponse && responses?.correctResponse) {
        score += this.calculateScore(responses.correctResponse, selectedResponse);
      }
    });

    return score;
  }

  private calculateScore(correctResponse : number[], selectedResponses: Response[]): number {
    const numberOfCorrect = correctResponse.length;
    let score = 0;

    selectedResponses.forEach(selectedResponse => {
      correctResponse.includes(selectedResponse.id) ? score++ : score--;
    });

    if (score> 0) {
      return score / numberOfCorrect
    }
    return 0;
  }
}