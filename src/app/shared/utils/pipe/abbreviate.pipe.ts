import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'abbreviate'
})
export class AbbreviatePipe implements PipeTransform {

  transform(text: string, maxLength: number = 5, afterText: string = '...'): string {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substr(0, maxLength) + afterText;
  }

}
