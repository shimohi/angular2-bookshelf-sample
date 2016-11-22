import {Component, HostListener} from "@angular/core";
import {Observable} from "rxjs";
import {OpenBookStateNotifier} from "../../../notifier/OpenBookStateNotifier";
import {BookActionImpl} from "../../../action/BookAction";
import {OpenBookState} from "../../../model/bookshelf-api";
import { UIStateNotifier } from "../../../notifier/UIStateNotifier";

@Component({
	moduleId: module.id,
	selector: "left",
	templateUrl: "left-component.html",
	styleUrls: ["left-component.css"]
})
export class LeftComponent {

	constructor(
		private bookState: OpenBookStateNotifier,
		private uiState: UIStateNotifier,
		private action: BookActionImpl
	) {
	}

	@HostListener("window:keydown", ["$event"])
	handleKeyboardEvent(event: KeyboardEvent) {
		if ( event.key !== "ArrowLeft" || this.uiState.getNotifiable().openBook !== true ) {
			return;
		}
		this.onClick();
	}

	@HostListener("mousedown")
	onClick(): void {
		const direction = this.bookState.geNotifiable().pageProgressionDirection;
		if (direction === "rtl" ) {
			this.action.toNext();
			return;
		}
		this.action.toPrev();
	}

	get enabled(): Observable<boolean> {
		return this.bookState.observable.map((revision) => {
			const state: OpenBookState = revision.after;
			if (state.pageProgressionDirection === "rtl") {
				return state.charCount > state.tailCharIndex + 1;
			}
			return state.headCharIndex > 0;
		});
	}

}
