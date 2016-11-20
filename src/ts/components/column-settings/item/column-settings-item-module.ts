import { NgModule }      from "@angular/core";
import {SettingsItemSheetModule} from "./sheet/settings-item-sheet-module";
import {ColumnSettingsItemComponent} from "./column-settings-item-component";

@NgModule({
	imports: [
		SettingsItemSheetModule,
	],
	declarations: [
		ColumnSettingsItemComponent
	]
})
export class ColumnSettingsItemModule { }
