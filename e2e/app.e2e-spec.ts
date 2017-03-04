import { UserManagementAngular2Page } from './app.po';

describe('user-management-angular2 App', () => {
  let page: UserManagementAngular2Page;

  beforeEach(() => {
    page = new UserManagementAngular2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
