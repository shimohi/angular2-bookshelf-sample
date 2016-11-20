import {Component} from "@angular/core";
import * as ColumnTypes from "../../service/ColumnTypes";
import {UIStateNotifier} from "../../notifier/UIStateNotifier";
import {Observable} from "rxjs";
import {AsyncStatePipe} from "../ObservablePipe"; // テンプレート内で利用するので削らないこと。

@Component({
	moduleId: module.id,
	selector: "column-settings",
	templateUrl: "column-settings-component.html",
	styleUrls: ["column-settings-component.css"],
	// pipes: [AsyncStatePipe],
	// changeDetection: 0
})
export class ColumnSettingsComponent {

	constructor(
		private uiState: UIStateNotifier,
	) { }

	get types(): number[] {

		const len = ColumnTypes.COLUMN_TYPES.length;
		const result: number[] = [];
		for (let i = 0; i < len; i++) {
			result.push(i);
		}
		return result;

	}

	get display(): Observable<boolean> {
		return this.uiState.observable.filter((revision) => {
			return revision.before != null && revision.before.openSettings !== revision.after.openSettings;
		}).map((revision) => {
			return revision.after.openSettings;
		});
	}
}
