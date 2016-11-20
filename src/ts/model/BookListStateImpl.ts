import {BookListState, BookInfo} from "./bookshelf-api";
import {BookInfoImplFactory} from "./BookInfoImpl";
import {Injectable} from "@angular/core";

export class BookListStateImpl implements BookListState {

	/**
	 * 現在表示可能な書籍のリスト
	 */
	viewList: BookInfo[];
	constructor() {
		this.viewList = [];
	}
}

@Injectable()
export class BookListStateImplFactory {

	constructor(
		private _bookInfoFactory: BookInfoImplFactory
	) { }

	get bookInfoFactory(): BookInfoImplFactory {
		return this._bookInfoFactory;
	}

	createInstance(): BookListStateImpl {
		return new BookListStateImpl();
	}
	clone(bookInfo: BookListState): BookListStateImpl {
		const cl = this.createInstance();
		const from = bookInfo.viewList;
		const to = cl.viewList;
		const len = cl.viewList.length;
		let i = 0 | 0 ;
		while ( i < len ) {
			to[i] = this.bookInfoFactory.clone(from[i]);
		}
		return cl;
	}
}
