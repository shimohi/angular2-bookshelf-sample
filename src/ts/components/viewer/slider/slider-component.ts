import {Observable} from "rxjs";
import {Component, ElementRef} from "@angular/core";
import {PageNumberInfo} from "../../../model/bookshelf-api";
import {OpenBookStateNotifier} from "../../../notifier/OpenBookStateNotifier";
import {ComponentUtils} from "../../ComponentUtils";
import {BookActionImpl} from "../../../action/BookAction";

@Component({
	moduleId: module.id,
	selector: "slider",
	templateUrl: "slider-component.html",
	styleUrls: [ "slider-component.css" ]
})
export class SliderComponent {

	private el: HTMLElement;

	constructor(
		elementRef: ElementRef,
		private bookAction: BookActionImpl,
		private bookState: OpenBookStateNotifier
	) {
		this.el = elementRef.nativeElement;
	}

	onClick(event: MouseEvent) {

		const point = ComponentUtils.getRelativeMousePoint(event, this.el);
		const width = this.el.clientWidth;
		this.bookAction.jump( point.x / width * 100);

	}

	get style(): Observable<any> {

		return this.bookState.observable.map((revision) => {

			const state = revision.after;
			if (state.pageCount == null || state.openPages[0].type === "spineKey" ) {
				return state.currentCharIndex / state.charCount * 100;
			}

			const progress = (<PageNumberInfo>state.openPages[0]).pageNumber / state.pageCount * 100;
			return {
				top: "30%",
				left: `${progress - 3}%`,
				height: "40%",
				width: "4%",
			};
		});
	}
}
