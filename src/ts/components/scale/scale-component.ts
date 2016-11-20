import {Observable, Subject, Subscription} from "rxjs";
import {Component, ElementRef, HostListener} from "@angular/core";
import {ViewStateNotifier} from "../../notifier/ViewStateNotifier";
import {ComponentUtils} from "../ComponentUtils";
import {UIStateNotifier} from "../../notifier/UIStateNotifier";
import {ViewerSettingActionImpl} from "../../action/ViewerSettingAction";

const SCALE_MAX: number = 4.0;
const SCALE_MIN: number = 1.0;

@Component({
	moduleId: module.id,
	selector: "scale",
	templateUrl: "scale-component.html",
	styleUrls: [ "scale-component.css" ]
})
export class ScaleComponent {

	private el: HTMLElement;
	private subject: Subject<number>;
	private dragging: boolean;
	private subscription: Subscription;

	constructor(
		elementRef: ElementRef,
		private viewerSettingsAction: ViewerSettingActionImpl,
		private viewState: ViewStateNotifier,
		private uiState: UIStateNotifier
	) {
		this.el = elementRef.nativeElement;
		this.dragging = false;
		this.subscription = null;
		this.subject = new Subject<number>();
	}

	ngOnDestroy() {
		if (this.subscription != null) { this.subscription.unsubscribe(); }
	}

	ngAfterViewInit(): void {
		this.subscription = this.viewState.observable
			.filter((revision) => {
				return revision.before == null || ( revision.before.scale !== revision.after.scale );
			})
			.subscribe((revision) => {
				const state = revision.after;
				this.subject.next(state.scale);
			});
	}

	@HostListener("mousemove", ["$event"])
	onMove(event: MouseEvent) {
		if ( this.dragging !== true ) {
			return;
		}
		this.subject.next(this.calcScale(event));
	}

	@HostListener("mousedown", ["$event"])
	onMouseDown(event: MouseEvent) {
		this.dragging = true;
		this.subject.next(this.calcScale(event));
	}

	@HostListener("window:mouseup", ["$event"])
	onMouseUp(event: MouseEvent) {
		this.dragging = false;
		this.viewerSettingsAction.changeScale(this.calcScale(event));
	}

	private calcScale(
		event: MouseEvent
	): number {

		const point = ComponentUtils.getRelativeMousePoint(event, this.el);

		const width = this.el.scrollWidth;
		const height = this.el.scrollHeight;

		let x = point.x;
		let y = point.y;

		const centerX = width / 2;
		const centerY = height / 2;

		// 中心点からの距離を計算
		const distance = Math.sqrt(Math.pow(centerX - x, 2) + Math.pow(centerY - y, 2));
		const maxSize = width > height ? height : width;

		let scale = ( SCALE_MAX / maxSize ) * distance;
		return ( scale < SCALE_MIN ) ? SCALE_MIN : ( ( scale > SCALE_MAX ) ? SCALE_MAX : scale );

	}

	get style(): Observable<any> {

		return this.subject.map((scale) => {

			const scale1 = ( scale < SCALE_MIN ) ? SCALE_MIN : ( ( scale > SCALE_MAX ) ? SCALE_MAX : scale );
			const maxWidth = this.el.clientWidth;
			const maxHeight = this.el.clientHeight;

			let size = ( maxWidth > maxHeight ? maxHeight : maxWidth ) * scale1 / SCALE_MAX;
			let spaceX = maxWidth / 2 - size / 2;
			let spaceY = maxHeight / 2 - size / 2;

			return {
				position: "absolute",
				left: `${spaceX}px`,
				top: `${spaceY}px`,
				width: `${size}px`,
				height: `${size}px`
			};
		});
	}

	get display(): Observable<boolean> {
		return this.uiState.observable.filter((revision) => {
			return revision.before != null || revision.before.openSettings !== revision.after.openSettings;
		}).map((revision) => {
			return revision.after.openSettings;
		});
	}
}
