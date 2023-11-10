import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(startDate: Date): number {
    return (new Date().getTime() - startDate.getTime()) / 1000;
  }

}
