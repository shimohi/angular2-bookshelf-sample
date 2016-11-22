import {Component} from "@angular/core";
import { Observable } from "rxjs";
import { UIStateNotifier } from "../../notifier/UIStateNotifier";

@Component({
	moduleId: module.id,
	selector: "viewer",
	templateUrl: "viewer-component.html",
	styleUrls: [ "viewer-component.css" ]
})
export class ViewerComponent {

	constructor(
		private uiState: UIStateNotifier
	) {

	}

	get display(): Observable<boolean> {
		return this.uiState.observable.filter((revision) => {
			return revision.before != null && revision.before.openBook !== revision.after.openBook;
		}).map((revision) => {
			return revision.after.openBook === true;
		});
	}

}