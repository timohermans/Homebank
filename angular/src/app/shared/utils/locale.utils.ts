import {registerLocaleData} from '@angular/common';
import localeNl from '@angular/common/locales/nl';
import * as _ from 'lodash';

export const supportedLocales = [
  'nl',
  'en'
];

export function registerAppLocaleData() {
  registerLocaleData(localeNl, 'nl');
}

export function getLocale() {
  const locale = navigator.language;

  if (_.includes(supportedLocales, locale)) {
    return locale;
  }

  return 'en';
}
