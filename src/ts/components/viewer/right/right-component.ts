import {Component, HostListener} from "@angular/core";
import {Observable} from "rxjs";
import {OpenBookStateNotifier} from "../../../notifier/OpenBookStateNotifier";
import {BookActionImpl} from "../../../action/BookAction";
import {OpenBookState} from "../../../model/bookshelf-api";
import { UIStateNotifier } from "../../../notifier/UIStateNotifier";

@Component({
	moduleId: module.id,
	selector: "right",
	templateUrl: "right-component.html",
	styleUrls: ["right-component.css"]
})
export class RightComponent {

	enable: boolean;

	constructor(
		private bookState: OpenBookStateNotifier,
		private uiState: UIStateNotifier,
		private action: BookActionImpl
	) {
	}

	@HostListener("window:keydown", ["$event"])
	handleKeyboardEvent(event: KeyboardEvent) {
		if ( event.key !== "ArrowRight" || this.uiState.getNotifiable().openBook !== true ) {
			return;
		}
		this.onClick();
	}

	@HostListener("mousedown")
	onClick(): void {
		const direction = this.bookState.geNotifiable().pageProgressionDirection;
		if (direction === "ltr" ) {
			this.action.toNext();
			return;
		}
		this.action.toPrev();
	}

	get enabled(): Observable<boolean> {
		return this.bookState.observable.map((revision) => {
			const state: OpenBookState = revision.after;
			if (state.pageProgressionDirection === "ltr") {
				return state.charCount > state.tailCharIndex + 1;
			}
			return state.headCharIndex > 0;
		});
	}

}
