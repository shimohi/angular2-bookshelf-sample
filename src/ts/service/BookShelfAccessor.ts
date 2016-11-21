import "rxjs/add/operator/toPromise";
import { Injectable }    from "@angular/core";
import { BookInfo } from "../model/bookshelf-api";

export class BookShelfAccessor {

	getBookList(): Promise<BookInfo[]> {
		return Promise.resolve([
			{
				title: "書籍A",
				id: "A"
			},
			{
				title: "書籍B",
				id: "B"
			}
		]);
	}

}
