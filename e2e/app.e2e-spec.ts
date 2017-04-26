import { WebMistPage } from './app.po';

describe('web-mist App', () => {
  let page: WebMistPage;

  beforeEach(() => {
    page = new WebMistPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('WebMist!');
  });
});
