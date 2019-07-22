import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'map'
})
export class MapPipe implements PipeTransform {

  transform(arg1: any, mapFunction: (arg1: any, arg2?: any) => any, arg2?: any): any {
    return mapFunction(arg1, arg2);
  }

}
