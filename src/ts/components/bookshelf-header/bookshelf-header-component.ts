import {Component, HostListener} from "@angular/core";
import {UIStateNotifier} from "../../notifier/UIStateNotifier";
import {Observable} from "rxjs";
import {UIState} from "../../model/bookshelf-api";
import {UIActionImpl} from "../../action/UIAction";

@Component({
	moduleId: module.id,
	selector: "bookshelf-header",
	templateUrl: "bookshelf-header-component.html",
	styleUrls: ["bookshelf-header-component.css"]
})
export class HeaderComponent {

	constructor(
		private uiState: UIStateNotifier,
		private action: UIActionImpl
	) {

	}

	@HostListener("mouseover")
	onMouseOver(): void {
		this.action.openHeader();
	}

	@HostListener("mouseout")
	onMouseOut(): void {
		this.action.closeHeader();
	}

	openViewer(): void {
		this.action.openViewer();
	}

	openBookList(): void {
		this.action.openBookList();
	}

	openSettings(): void {
		this.action.openSettings();
	}

	get display(): Observable<boolean> {
		return this.uiState.observable.filter((revision) => {
			return revision.before != null && revision.before.openHeader !== revision.after.openHeader;
		}).map((revision) => {
			return revision.after.openHeader;
		});
	}

	get state(): Observable<UIState> {
		return this.uiState.observable.map((revision) => {
			return revision.after;
		});
	}

}
