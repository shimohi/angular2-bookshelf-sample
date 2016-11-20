import {BookInfo} from "./bookshelf-api";

export class BookInfoImpl implements BookInfo {

	/**
	 * 書籍名
	 */
	title: string;

	/**
	 * 書籍ID
	 */
	id: string;

	constructor() {
		this.title = null;
		this.id = null;
	}
}

export class BookInfoImplFactory {

	createInstance(): BookInfoImpl {
		return new BookInfoImpl();
	}
	clone(bookInfo: BookInfo): BookInfoImpl {
		const cl = this.createInstance();
		cl.id = bookInfo.id;
		cl.title = bookInfo.title;
		return cl;
	}

}
