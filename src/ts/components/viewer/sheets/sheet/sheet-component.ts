import {Component, Input, ElementRef, AfterViewInit, OnDestroy} from "@angular/core";
import {Observable, Subscription} from "rxjs";
import {ViewStateNotifier} from "../../../../notifier/ViewStateNotifier";
import {OpenBookStateNotifier} from "../../../../notifier/OpenBookStateNotifier";
import {BookAccessor} from "../../../../service/BookAccessor";
import {DisplayInfo} from "../../../../service/DisplayInfo";
import * as ColumnTypes from "../../../../service/ColumnTypes";

@Component({
	moduleId: module.id,
	selector: "sheet",
	templateUrl: "sheet-component.html",
	styleUrls: ["sheet-component.css"]
})

export class SheetComponent implements AfterViewInit, OnDestroy {

	@Input()
	columnNumber: number;

	private subscription: Subscription;

	constructor(
		private el: ElementRef,
		private viewState: ViewStateNotifier,
		private bookState: OpenBookStateNotifier,
		private bookAccessor: BookAccessor
	) {

	}

	ngOnDestroy() {
		if (this.subscription) { this.subscription.unsubscribe(); }
	}

	ngAfterViewInit(): void {

		// Viewer初期化
		const canvas = this.el.nativeElement;

		this.subscription = this.bookState.observable
			.subscribe((revision) => {

			const state = revision.after;
			if (state.openPages.length <= this.columnNumber) {
				return;
			}

			this.bookAccessor.getPage(state.openPages[this.columnNumber]).then((page) => {
				// 描画処理の実行
			});
		});
	}

	get displayInfo(): Observable<DisplayInfo> {

		return this.viewState.observable.map((revision) => {

			const state = revision.after;
			const width = state.width;
			const height = state.height;
			const type = ColumnTypes.COLUMN_TYPES[state.columnType];
			const column = type.columns[this.columnNumber];
			const displayInfo = new DisplayInfo();

			displayInfo.display = column.display;
			displayInfo.x = width * column.percentX / 100;
			displayInfo.y = height * column.percentY / 100;
			displayInfo.width = width * type.columnWidthPercent / 100;
			displayInfo.height = height * type.columnHeightPercent / 100;

			return displayInfo;

		});
	}

	get divStyle(): Observable<any> {
		return this.displayInfo.map((info) => {
			return {
				position: "absolute",
				left: info.x,
				top: info.y,
				width: info.width,
				height: info.height,
				display: info.display === true ? "inherit" : "none"
			};
		});
	}

	get canvasStyle(): Observable<any> {
		return this.displayInfo.map((info) => {
			return {
				width: info.width,
				height: info.height
			};
		});
	}
}
