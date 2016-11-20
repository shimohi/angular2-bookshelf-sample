import { NgModule }      from "@angular/core";
import {ColumnSettingsComponent} from "./column-settings-component";
import {ColumnSettingsItemModule} from "./item/column-settings-item-module";

@NgModule({
	imports: [
		ColumnSettingsItemModule,
	],
	declarations: [
		ColumnSettingsComponent
	]
})
export class ColumnSettingsModule { }
