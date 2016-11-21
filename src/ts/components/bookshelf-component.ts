import {Component} from "@angular/core";
import {ViewerSettingActionImpl} from "../action/ViewerSettingAction";
import {UIActionImpl} from "../action/UIAction";
import {BookShelfActionImpl} from "../action/BookShelfAction";
import {BookActionImpl} from "../action/BookAction";
import {ViewStateNotifier} from "../notifier/ViewStateNotifier";
import {UIStateNotifier} from "../notifier/UIStateNotifier";
import {OpenBookStateNotifier} from "../notifier/OpenBookStateNotifier";
import {BookListStateNotifier} from "../notifier/BookListStateNotifier";
import {UIStateImplFactory} from "../model/UIStateImpl";
import {OpenBookStateImplFactory} from "../model/OpenBookStateImpl";
import {BookListStateImplFactory} from "../model/BookListStateImpl";
import {ViewStateImplFactory} from "../model/ViewStateImpl";
import {Themes} from "../service/Themes";
import {BookShelfAccessor} from "../service/BookShelfAccessor";
import {BookAccessor} from "../service/BookAccessor";
import {OpenPageKeyImplFactories} from "../model/OpenPageKeyImpl";
import {BookInfoImplFactory} from "../model/BookInfoImpl";

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

}