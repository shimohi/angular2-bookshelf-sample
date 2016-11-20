import {BookListState, BookInfo} from "../model/bookshelf-api";
import {Notifiable} from "./notifier-interfaces";
import {BookInfoImplFactory, BookInfoImpl} from "../model/BookInfoImpl";
import {BookListStateNotifier} from "./BookListStateNotifier";
import {BookListStateImpl} from "../model/BookListStateImpl";

export class BookListStateNotifiable implements Notifiable, BookListState {

	constructor(
		private bookListStateNotifier: BookListStateNotifier,
		private bookInfoFactory: BookInfoImplFactory,
		private state: BookListStateImpl
	) {}

	get viewList(): BookInfo[] {
		return this.state.viewList;
	}

	set viewList(value: BookInfo[]) {
		this.state.viewList = value;
	}

	notify(): void {
		this.bookListStateNotifier.notify(this.state);
	}

	createBookInfo(): BookInfoImpl {
		return this.bookInfoFactory.createInstance();
	}
}