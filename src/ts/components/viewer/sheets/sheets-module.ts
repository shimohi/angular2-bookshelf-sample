import { NgModule }      from "@angular/core";
import {SheetModule} from "./sheet/sheet-module";
import {SheetsComponent} from "./sheets-component";

@NgModule({
	imports: [
		SheetModule,
	],
	declarations: [
		SheetsComponent
	]
})
export class SheetsModule { }
