export interface Response {
    choice: string;
    isCorrect: boolean;
}

export interface Question {
    title: string,
    type: string,
    response : Response[],

}
