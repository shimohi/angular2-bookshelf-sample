import {Component } from "@angular/core";
import {Themes} from "../../service/Themes";
import {UIStateNotifier} from "../../notifier/UIStateNotifier";
import {Observable} from "rxjs";

@Component({
	moduleId: module.id,
	selector: "themes",
	templateUrl: "themes-component.html",
	styleUrls: [ "themes-component.css" ]
})
export class ThemesComponent {

	themes: Themes;
	constructor(
		themes: Themes,
		private uiState: UIStateNotifier
	) {
		this.themes = themes;
	}

	get display(): Observable<boolean> {
		return this.uiState.observable.filter((revision) => {
			return revision.before == null || revision.before.openSettings !== revision.after.openSettings;
		}).map((revision) => {
			return revision.after.openSettings;
		});
	}
}
