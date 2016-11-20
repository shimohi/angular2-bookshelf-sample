import { NgModule } from "@angular/core";
import { ThemesModule } from "./themes/themes-module";
import { SheetsModule } from "./viewer/sheets/sheets-module";
import { BookListModule } from "./book-list/book-list-module";
import { ColumnSettingsModule } from "./column-settings/column-settings-module";
import {ScaleModule} from "./scale/scale-module";
import {BookShelfComponent} from "./bookshelf-component";
import {HeaderModule} from "./bookshelf-header/bookshelf-header-module";
import {ViewerModule} from "./viewer/viewer-module";
import {CapitalizePipe} from "../capitalize.pipe";

@NgModule({
	imports: [
		// BookListModule,
		ColumnSettingsModule,
		// HeaderModule,
		// ViewerModule,
		// ScaleModule,
		// SheetsModule,
		// ThemesModule,
	],
	declarations: [
		CapitalizePipe,
		BookShelfComponent
	]
})
export class BookShelfModule { }
