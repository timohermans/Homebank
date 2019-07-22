import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'toCurrency',
})
export class ToCurrencyPipe implements PipeTransform {
  transform(value: number): string {
    const formatter = new Intl.NumberFormat('nl-NL', {
      currency: 'EUR',
      minimumFractionDigits: 2,
      style: 'currency'
    });

    return formatter.format(value);
  }
}
