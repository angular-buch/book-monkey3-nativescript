import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Provider } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookListItemComponent } from './book-list-item/book-list-item.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { SearchComponent } from './search/search.component';

import { TokenInterceptor } from './shared/token-interceptor';

export const COMPONENT_DECLARATIONS: any[] = [
  AppComponent,
  HomeComponent,
  BookListComponent,
  BookListItemComponent,
  BookDetailsComponent,
  SearchComponent
];

export const PROVIDERS: Provider[] = [
  { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
];
