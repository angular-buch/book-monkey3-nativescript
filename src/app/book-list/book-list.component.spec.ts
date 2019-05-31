import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';
import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { BookListComponent } from './book-list.component';
import { BookStoreService } from '../shared/book-store.service';
import { Book } from '../shared/book';

@Component({ template: '<router-outlet></router-outlet>' })
class TestOutletComponent { }

@Component({
  selector: 'bm-book-list-item',
  template: ''
})
class TestBookListItemComponent {
  @Input() book: Book;
}

@Component({ template: '' })
class TestDetailsComponent { }

describe('BookListComponent', () => {
  let component: BookListComponent;
  let fixture: ComponentFixture<BookListComponent>;
  let service: BookStoreService;

  const expectedBooks = [
    {
      isbn: '111',
      title: 'Book 1',
      authors: [],
      published: new Date()
    },
    {
      isbn: '222',
      title: 'Book 2',
      authors: [],
      published: new Date()
    }
  ];

  let httpMock;

  beforeEach(() => {
    httpMock = {
      getAll: () => of(expectedBooks)
    };

    TestBed.configureTestingModule({
      declarations: [
        TestOutletComponent,
        BookListComponent,
        TestBookListItemComponent,
        TestDetailsComponent
      ],
      providers: [{
        provide: BookStoreService,
        useValue: httpMock
      }],
      imports: [
        RouterTestingModule.withRoutes([
          { path: ':isbn', component: TestDetailsComponent }
        ])
      ]
    })
    .compileComponents();
  });

  beforeEach(async(() => {
    TestBed.createComponent(TestOutletComponent);
    fixture = TestBed.createComponent(BookListComponent);
    service = TestBed.get(BookStoreService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should display books', () => {
    let receivedBooks: Book[];
    service.getAll().subscribe(b => receivedBooks = b);

    expect(receivedBooks.length).toBe(2);
    expect(receivedBooks[0].isbn).toBe('111');
    expect(receivedBooks[1].isbn).toBe('222');
  });

  it('should navigate to details page by ISBN', async(inject([Location], (location) => {
    fixture.nativeElement.querySelector('bm-book-list-item').click();
    fixture.whenStable().then(() => {
      expect(location.path()).toEqual('/111');
    });
  })));
});
