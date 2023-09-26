export interface Response {
    id: number;
    questionnaireId: number,
    questionId: number;
    choice?: string;
    correctResponse?: number[];
}

export interface Question {
    id: number,
    questionnaireId: number,
    text: string,
    isMultipleResponse: boolean,
    response : Response[],
    selectedResponse?: Response[]

}

export interface Questionnaire {
    questionnaireId: number,
    title: string,
}
