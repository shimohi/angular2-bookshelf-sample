import {Observable} from "rxjs";
import { Component, HostListener } from "@angular/core";
import {UIStateNotifier} from "../../../notifier/UIStateNotifier";
import {ViewerSettingActionImpl} from "../../../action/ViewerSettingAction";
import {ComponentUtils} from "../../ComponentUtils";

@Component({
	moduleId: module.id,
	selector: "sheets",
	templateUrl: "sheets-component.html",
	styleUrls: [ "sheets-component.css" ]
})
export class SheetsComponent {

	constructor(
		private uiState: UIStateNotifier,
		private action: ViewerSettingActionImpl
	) { }

	@HostListener("window:resize", ["$event"])
	onResize(event) {
		const point = ComponentUtils.getRelativeMousePoint(event);
		this.action.resize(
			point.x, point.y
		);
	}

	get display(): Observable<boolean> {
		return this.uiState.observable.filter((revision) => {
			return revision.before == null || revision.before.openBook !== revision.after.openBook;
		}).map((revision) => {
			return revision.after.openBook === true;
		});
	}

}
