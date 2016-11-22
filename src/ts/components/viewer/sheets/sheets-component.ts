import { Observable, Subscription } from "rxjs";
import { Component, HostListener, ElementRef, AfterViewInit, OnDestroy } from "@angular/core";
import {UIStateNotifier} from "../../../notifier/UIStateNotifier";
import {ViewerSettingActionImpl} from "../../../action/ViewerSettingAction";

@Component({
	moduleId: module.id,
	selector: "sheets",
	templateUrl: "sheets-component.html",
	styleUrls: [ "sheets-component.css" ]
})
export class SheetsComponent implements AfterViewInit, OnDestroy {

	private element: Element;
	private init: boolean;
	private settingsSubscription: Subscription;

	constructor(
		private elementRef: ElementRef,
		private uiState: UIStateNotifier,
		private action: ViewerSettingActionImpl
	) {
		this.element = null;
		this.init = false;
	}

	ngOnDestroy() {
		if (this.settingsSubscription != null) { this.settingsSubscription.unsubscribe(); }
	}

	ngAfterViewInit(): void {
		this.element = (<Element>this.elementRef.nativeElement).getElementsByTagName("div").item(0);

		this.settingsSubscription = this.uiState.observable
			.filter((revision) => {
				return revision.before == null || ( revision.before.openSettings !== revision.after.openSettings );
			}).subscribe(() => {
				setTimeout(() => {
					this.onResize();
				}, 300);
			});

	}

	@HostListener("window:resize")
	onResize() {
		if ( this.element == null || this.element.clientWidth === 0 || this.element.clientHeight === 0) {
			return;
		}
		this.init = true;
		this.action.resize(
			this.element.clientWidth, this.element.clientHeight
		);
	}

	get display(): Observable<boolean> {
		return this.uiState.observable.filter((revision) => {
			return revision.before == null || revision.before.openBook !== revision.after.openBook;
		}).map((revision) => {

			if (this.init !== true ) {
				setTimeout(() => {
					this.onResize();
				}, 200);
			}
			return revision.after.openBook === true;
		});
	}

}
