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

	private element: Element;

	constructor(
		private elementRef: ElementRef,
		private bookAction: BookActionImpl,
		private bookState: OpenBookStateNotifier
	) {
		this.element = null;
	}

	ngAfterViewInit(): void {
		this.element = (<Element>this.elementRef.nativeElement).getElementsByClassName("slider-bar").item(0);
	}

	onClick(event: MouseEvent) {

		if (this.element == null) {
			return;
		}
		const point = ComponentUtils.getRelativeMousePoint(event, this.element);
		const width = this.element.clientWidth;

		if (this.bookState.geNotifiable().pageProgressionDirection === "rtl") {
			this.bookAction.jump( ( 1 - point.x / width ) * 100);
			return;
		}
		this.bookAction.jump( point.x / width * 100);

	}

	get style(): Observable<any> {

		return this.bookState.observable.map((revision) => {

			const state = revision.after;
			if (state.openPages[0] == null) {
				return {
					display: "none"
				};
			}

			let start: number;
			let end: number;

			// 進捗率を計算
			if (state.pageCount == null || state.openPages[0].type === "spineKey" ) {
				start =  state.headCharIndex / state.charCount;
				end = state.tailCharIndex / state.charCount;
			} else {
				const pages = <PageNumberInfo[]>state.openPages;
				start = pages[0].pageNumber / state.pageCount;
				end = ( pages[pages.length - 1].pageNumber + 1 ) / state.pageCount;
			}

			// right to left 対応
			if (state.pageProgressionDirection === "rtl") {
				const start1 = 1 - end;
				end = 1 - start;
				start = start1;
			}

			start = start * 90 + 5;
			end = end * 90 + 5;

			let width = end - start;
			if ( width < 4 ) {
				start = start + ( width / 2 ) - 2;
				width = 4;
			}

			return {
				opacity: width >= 90 ? "0.0" : "1.0",
				top: "40%",
				left: `${start}%`,
				height: "20%",
				width: `${width}%`,
			};
		});
	}
}
