import {Component} from "@angular/core";
import {BookListStateNotifier} from "../../notifier/BookListStateNotifier";
import {Observable} from "rxjs";
import {BookInfo} from "../../model/bookshelf-api";
import {UIStateNotifier} from "../../notifier/UIStateNotifier";

@Component({
	moduleId: module.id,
	selector: "book-list",
	templateUrl: "book-list-component.html",
	styleUrls: ["book-list-component.css"]
})
export class BookListComponent {

	constructor(
		private bookListState: BookListStateNotifier,
		private uiState: UIStateNotifier
	) { }

	get bookInfoList(): Observable<BookInfo[]> {
		return this.bookListState.observable.map((revision) => {
			return revision.after.viewList;
		});
	}

	get display(): Observable<boolean> {
		return this.uiState.observable.filter((revision) => {
			return revision.before == null || revision.before.openBook !== revision.after.openBook;
		}).map((revision) => {
			return revision.after.openBook !== true;
		});
	}

}
