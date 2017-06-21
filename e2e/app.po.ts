import { browser, element, by } from 'protractor';

export class WebMistPage {
  navigateTo() {
    return browser.get('/');
  }
}
