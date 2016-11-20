import {Component, Input, HostListener} from "@angular/core";
import * as ColumnTypes from "../../../service/ColumnTypes";
import {ViewStateNotifier} from "../../../notifier/ViewStateNotifier";
import {Observable} from "rxjs";
import {ViewerSettingActionImpl} from "../../../action/ViewerSettingAction";
import {AsyncStatePipe} from "../../ObservablePipe"; // テンプレート内で利用するので削らないこと。

@Component({
	moduleId: module.id,
	selector: "column-settings-item",
	templateUrl: "column-settings-item-component.html",
	styleUrls: ["column-settings-item-component.css"],
	// pipes: [AsyncStatePipe],
	// changeDetection: 0
})
export class ColumnSettingsItemComponent {

	@Input()
	type: number;

	width: number;

	height: number;

	constructor(
		private viewAction: ViewerSettingActionImpl,
		private viewState: ViewStateNotifier
	) { }

	get columnNumbers(): number[] {

		if (this.type == null) {
			return [];
		}
		const len = ColumnTypes.COLUMN_TYPES[this.type].columnCount;
		const result: number[] = [];
		for (let i = 0; i < len; i++) {
			result.push(i);
		}
		return result;
	}

	@HostListener("mousedown")
	onClick(): void {
		this.viewAction.changeColumnType(this.type);
	}

	get className(): Observable<string> {
		return this.viewState.observable.filter((revision) => {
			return revision.before == null || revision.before.columnType !== revision.after.columnType;
		}).map((revision) => {
			return revision.after.columnType === this.type ? "column-settings-item-selected" : "column-settings-item";
		});
	}

}
