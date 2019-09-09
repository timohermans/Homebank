import { Pipe, PipeTransform } from '@angular/core';
import { isEmpty } from 'lodash';

@Pipe({
  name: 'isEmpty'
})
export class IsEmptyPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    return isEmpty(value);
  }
}
