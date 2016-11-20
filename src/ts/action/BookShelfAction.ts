import {BookShelfAction} from "./bookshelf-action-api";
import {BookShelfAccessor} from "../service/BookShelfAccessor";
import {BookListStateNotifier} from "../notifier/BookListStateNotifier";
import {Injectable} from "@angular/core";

@Injectable()
export class BookShelfActionImpl implements BookShelfAction {

	constructor(
		private bookShelfAccessor: BookShelfAccessor,
		private bookListStateNotifier: BookListStateNotifier
	) {

	}

	requestBookList(): void {

		const state = this.bookListStateNotifier.getNotifiable();
		this.bookShelfAccessor.getBookList().then(( list ) => {
			state.viewList = list;
			state.notify();
		});

	}
}