import {Component, Input} from "@angular/core";
import {Theme} from "../../../service/Themes";
import {ViewStateNotifier} from "../../../notifier/ViewStateNotifier";
import {Observable} from "rxjs";
import {ViewerSettingActionImpl} from "../../../action/ViewerSettingAction";

@Component({
	moduleId: module.id,
	selector: "theme",
	templateUrl: "theme-component.html",
	styleUrls: [ "theme-component.css" ]
})
export class ThemeComponent {

	@Input()
	theme: Theme;

	constructor(
		private viewerSettingAction: ViewerSettingActionImpl,
		private viewStateNotifier: ViewStateNotifier
	) { }

	onClick(): void {
		this.viewerSettingAction.changeRenderingTheme(this.theme.name);
	}

	get selected(): Observable<boolean> {
		return this.viewStateNotifier.observable.map((state) => {
			return state.after.theme === this.theme.name;
		});
	}

}
