import { ToCurrencyPipe } from './to-currency.pipe';
import * as _ from 'lodash';

describe('ToCurrencyPipe', () => {
  const pipe = new ToCurrencyPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  describe('passing a number', () => {
    const value = 42;
    let numberWithCurrency: string;

    beforeEach(() => {
      numberWithCurrency = pipe.transform(value);
    });

    /**
     * so Intl support behaves differently from node and the browser, so I'm just going to test it like this.
     */
    it('should be formatted with currency symbol', () => {
      expect(numberWithCurrency).toContain('42,00');
      expect(numberWithCurrency).toContain('€');
    });
  });
});
