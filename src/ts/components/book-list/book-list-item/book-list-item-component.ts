import {Component, Input} from "@angular/core";
import {BookInfo} from "../../../model/bookshelf-api";
import {BookActionImpl} from "../../../action/BookAction";
import {UIActionImpl} from "../../../action/UIAction";

@Component({
	moduleId: module.id,
	selector: "book-list-item",
	templateUrl: "book-list-item-component.html",
	styleUrls: ["book-list-item-component.css"]
})
export class BookListItemComponent {

	constructor(
		private bookAction: BookActionImpl,
		private uiAction: UIActionImpl
	) {}

	@Input()
	bookInfo: BookInfo;

	onMouseDown(): void {
		this.bookAction.changeBook(this.bookInfo.id);
		this.uiAction.openViewer();
	}
}
