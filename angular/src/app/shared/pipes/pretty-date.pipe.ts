import {Pipe, PipeTransform} from '@angular/core';
import {Observable, of} from 'rxjs';
import {formatDate} from '@angular/common';
import * as _ from 'lodash';
import {getLocale} from '../utils/locale.utils';

@Pipe({
  name: 'prettyDate'
})
export class PrettyDatePipe implements PipeTransform {

  transform(date: string | Date): string {
    if (!date) {
      return '';
    }

    if (typeof date === 'string') {
      date = new Date(date);
    }

    if (this.isToday(date)) {
      return 'dates.today';
    }

    if (this.isYesterday(date)) {
      return 'dates.yesterday';
    }

    const locale = getLocale();

    if (this.isThisYear(date)) {
      return formatDate(date, 'd MMM', locale);
    }

    return formatDate(date, 'd MMM yyyy', locale);
  }

  private isToday(someDate: Date): boolean {
    const today = new Date();
    return someDate.getDate() == today.getDate() &&
      someDate.getMonth() == today.getMonth() &&
      someDate.getFullYear() == today.getFullYear();
  }

  private isYesterday(someDate: Date) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return someDate.getDate() == yesterday.getDate() &&
      someDate.getMonth() == yesterday.getMonth() &&
      someDate.getFullYear() == yesterday.getFullYear();
  }

  private isThisYear(someDate: Date): boolean {
    const thisYear = new Date().getFullYear();
    return thisYear === someDate.getFullYear();
  }
}
