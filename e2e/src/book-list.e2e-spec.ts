import { BookListPage } from './book-list.po';

describe('Book List Page', function() {
  let listPage: BookListPage;

  beforeEach(() => listPage = new BookListPage());

  it('should display at least two books', () => {
    const bookItems = listPage.navigateTo().getBookItems();
    expect(bookItems.count()).toBeGreaterThan(1);
  });

  it('should navigate to details page by ISBN', () => {
    const detailsPage = listPage.navigateTo().clickOnFirstBook();
    expect(detailsPage.getUrl()).toContain('/books/9783864906466');
    expect(detailsPage.getHeaderText()).toBe('Angular');
  });
});
