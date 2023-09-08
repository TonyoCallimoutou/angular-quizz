export interface Response {
    choice: string;
    isCorrect: boolean;
}

export interface Question {
    theme: string,
    text: string,
    response : Response[],
    selectedResponse?: Response[]

}
