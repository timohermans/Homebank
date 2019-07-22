import {MapPipe} from './map.pipe';

describe('MapPipe', () => {
  it('create an instance', () => {
    const pipe = new MapPipe();
    expect(pipe).toBeTruthy();
  });

  describe('having a valid function', () => {
    let pipe: MapPipe;
    const validFunction = (name: string, surname: string) => `hello, ${name} ${surname}`;

    beforeEach(() => {
      pipe = new MapPipe();
    });

    describe('supplying one argument', () => {
      const validArgument = 'Timo';
      let transformedValue: string;

      beforeEach(() => {
        transformedValue = pipe.transform(validArgument, validFunction);
      });

      it('transforms successfully', () => {
        expect(transformedValue).toBe(`hello, ${validArgument} undefined`);
      });
    });

    describe('supplying two arguments', () => {
      const validArgument = 'Timo';
      const validSecondArgument = 'Hermans';
      let transformedValue: string;

      beforeEach(() => {
        transformedValue = pipe.transform(validArgument, validFunction, validSecondArgument);
      });

      it('transforms successfully', () => {
        expect(transformedValue).toBe(`hello, ${validArgument} ${validSecondArgument}`);
      });
    });
  });
});
