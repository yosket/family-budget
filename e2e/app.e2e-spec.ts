import { FamilyBudgetPage } from './app.po';

describe('family-budget App', () => {
  let page: FamilyBudgetPage;

  beforeEach(() => {
    page = new FamilyBudgetPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
