import {Component} from "@angular/core";
import {Themes} from "../service/Themes";
import {UIActionImpl} from "../action/UIAction";
import {BookActionImpl} from "../action/BookAction";
import {BookAccessor} from "../service/BookAccessor";
import {UIStateImplFactory} from "../model/UIStateImpl";
import {BookInfoImplFactory} from "../model/BookInfoImpl";
import {ViewStateImplFactory} from "../model/ViewStateImpl";
import {UIStateNotifier} from "../notifier/UIStateNotifier";
import {BookShelfActionImpl} from "../action/BookShelfAction";
import {BookShelfAccessor} from "../service/BookShelfAccessor";
import {ViewStateNotifier} from "../notifier/ViewStateNotifier";
import {OpenPageKeyImplFactories} from "../model/OpenPageKeyImpl";
import {OpenBookStateImplFactory} from "../model/OpenBookStateImpl";
import {BookListStateImplFactory} from "../model/BookListStateImpl";
import {ViewerSettingActionImpl} from "../action/ViewerSettingAction";
import {OpenBookStateNotifier} from "../notifier/OpenBookStateNotifier";
import {BookListStateNotifier} from "../notifier/BookListStateNotifier";
import { Observable } from "rxjs";

@Component({
	moduleId: module.id,
	providers: [
		BookAccessor,
		BookShelfAccessor,
		Themes,
		ViewStateImplFactory,
		BookInfoImplFactory,
		BookListStateImplFactory,
		OpenPageKeyImplFactories,
		OpenBookStateImplFactory,
		UIStateImplFactory,
		BookListStateNotifier,
		OpenBookStateNotifier,
		UIStateNotifier,
		ViewStateNotifier,
		BookActionImpl,
		BookShelfActionImpl,
		UIActionImpl,
		ViewerSettingActionImpl
	],
	selector: "bookshelf",
	templateUrl: "bookshelf-component.html",
	styleUrls: [ "bookshelf-component.css" ]
})
export class BookShelfComponent {

	constructor(
		private uiState: UIStateNotifier
	) { }

	get className(): Observable<string> {
		return this.uiState.observable.filter((revision) => {
			return revision.before == null || revision.before.openSettings !== revision.after.openSettings;
		}).map((revision) => {
			return revision.after.openSettings === true ? "main-container-small" : "main-container";
		});
	}

}