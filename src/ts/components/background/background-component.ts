import { Component, AfterViewInit, HostListener } from "@angular/core";
import { UIActionImpl } from "../../action/UIAction";

@Component({
	moduleId: module.id,
	selector: "background",
	templateUrl: "background-component.html",
	styleUrls: ["background-component.css"]
})
export class BackgroundComponent {

	constructor(
		private uiAction: UIActionImpl
	) { }

	@HostListener("mousedown")
	onClick(): void {
		this.uiAction.toggleSettings();
	}
}
