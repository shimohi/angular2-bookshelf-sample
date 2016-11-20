import {Observable} from "rxjs";
import {Component, Input} from "@angular/core";
import {ColumnType} from "../../../../service/ColumnTypes";
import * as ColumnTypes from "../../../../service/ColumnTypes";
import {ViewStateNotifier} from "../../../../notifier/ViewStateNotifier";

@Component({
	moduleId: module.id,
	selector: "settings-item-sheet",
	templateUrl: "settings-item-sheet-component.html",
	styleUrls: ["settings-item-sheet-component.css"],
})
export class SettingsItemSheetComponent {

	@Input()
	columnNumber: number;

	@Input()
	columnType: number;

	constructor(
		private viewState: ViewStateNotifier
	) {

	}

	get style(){
		const type: ColumnType = ColumnTypes.COLUMN_TYPES[this.columnType];
		const column = type.columns[this.columnNumber];
		return {
			position: "absolute",
			left: `${column.percentX}%`,
			top: `${column.percentY}%`,
			width: `${type.columnWidthPercent}%`,
			height: `${type.columnHeightPercent}%`,
		};
	}

	get className(): Observable<string> {
		return this.viewState.observable.filter((revision) => {
			return revision.before == null || revision.before.columnType !== revision.after.columnType;
		}).map((revision) => {
			return revision.after.columnType === this.columnType ? "settings-item-sheet-selected" : "settings-item-sheet";
		});
	}

}
