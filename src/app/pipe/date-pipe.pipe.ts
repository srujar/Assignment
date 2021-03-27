import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'datePipe'
})
export class DatePipePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    // console.log("value", value);
    // let todays_date = new Date();
    // console.log("todays_date", todays_date);
    // let diff: any = moment.duration(moment(value).diff(moment(todays_date)));
    // console.log("diff", diff);

    // var days = parseInt(diff.asDays()); //84

    // var hours = parseInt(diff.asHours()); //2039 hours, but it gives total hours in given miliseconds which is not expacted.

    // hours = hours - days * 24;  // 23 hours

    // var minutes = parseInt(diff.asMinutes()); //122360 minutes,but it gives total minutes in given miliseconds which is not expacted.

    // minutes = minutes - (days * 24 * 60 + hours * 60); //20 minutes.
    // console.log("days: ", days, " minutes: ", minutes);

    if (value) {

      return moment(value).format('DD/MM/YYYY');
    } else {
      return null;
    }
  }

}
