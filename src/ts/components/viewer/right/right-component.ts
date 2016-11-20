import {Component, HostListener} from "@angular/core";
import {Observable} from "rxjs";
import {OpenBookStateNotifier} from "../../../notifier/OpenBookStateNotifier";
import {BookActionImpl} from "../../../action/BookAction";
import {OpenBookState} from "../../../model/bookshelf-api";

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
		private action: BookActionImpl
	) {
	}

	@HostListener("mousedown")
	onClick(): void {
		const direction = this.bookState.geNotifiable().pageProgressionDirection;
		if (direction === "ltr" ) {
			this.action.toNext();
		}
		this.action.toPrev();
	}

	get enabled(): Observable<boolean> {
		return this.bookState.observable.map((revision) => {
			const state: OpenBookState = revision.after;
			if (state.pageProgressionDirection === "ltr") {
				return state.charCount > state.currentCharIndex + 1;
			}
			return state.currentCharIndex > 0;
		});
	}

}
