import { NgModule }      from "@angular/core";
import {BookListComponent} from "./book-list-component";
import {BookListItemModule} from "./book-list-item/book-list-item-module";

@NgModule({
	imports: [
		BookListItemModule,
	],
	declarations: [
		BookListComponent,
	]
})
export class BookListModule { }
