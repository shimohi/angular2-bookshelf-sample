import { NgModule }      from "@angular/core";
import {ThemeModule} from "./theme/theme-module";
import {ThemesComponent} from "./themes-component";

@NgModule({
	imports: [
		ThemeModule,
	],
	declarations: [
		ThemesComponent
	]
})
export class ThemesModule { }
