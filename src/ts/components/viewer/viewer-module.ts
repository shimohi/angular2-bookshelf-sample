import { NgModule }      from "@angular/core";
import {RightModule} from "./right/right-module";
import {LeftModule} from "./left/left-module";
import {SliderModule} from "./slider/slider-module";
import {SheetsModule} from "./sheets/sheets-module";
import {ViewerComponent} from "./viewer-component";

@NgModule({
	imports: [
		LeftModule,
		RightModule,
		SliderModule,
		SheetsModule
	],
	declarations: [
		ViewerComponent
	]
})
export class ViewerModule { }
