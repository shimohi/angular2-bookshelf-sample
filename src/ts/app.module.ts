// import "./rxjs-extensions";
// import { NgModule }      from "@angular/core";
// import { BrowserModule } from "@angular/platform-browser";
import { FormsModule }   from "@angular/forms";
// import {BookShelfModule} from "./components/bookshelf-module";
// import {BookShelfComponent} from "./components/bookshelf-component";
import {CapitalizePipe} from "./capitalize.pipe";
// import {ObservablePipe, CapitalizePipe} from "./components/ObservablePipe";

//
// @NgModule({
// 	imports: [
// 		BrowserModule,
// 		FormsModule,
// 		BookShelfModule,
// 	],
// 	// declarations: [
// 	// 	// ObservablePipe,
// 	// 	CapitalizePipe,
// 	// ],
// 	bootstrap: [ BookShelfComponent ]
// })
// export class AppModule { }


import { NgModule }      from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

// import { AppComponent }   from "./app.component";
import {ColumnSettingsItemComponent} from "./components/column-settings/item/column-settings-item-component";
import {ColumnSettingsComponent} from "./components/column-settings/column-settings-component";
import {SettingsItemSheetComponent} from "./components/column-settings/item/sheet/settings-item-sheet-component";
import {AsyncStatePipe} from "./components/ObservablePipe";
import {BookShelfComponent} from "./components/bookshelf-component";
import {BookListItemComponent} from "./components/book-list/book-list-item/book-list-item-component";
import {BookListComponent} from "./components/book-list/book-list-component";
import {HeaderComponent} from "./components/bookshelf-header/bookshelf-header-component";
import {ScaleComponent} from "./components/scale/scale-component";
import {ThemeComponent} from "./components/themes/theme/theme-component";
import {ThemesComponent} from "./components/themes/themes-component";
import {LeftComponent} from "./components/viewer/left/left-component";
import {RightComponent} from "./components/viewer/right/right-component";
import {SheetComponent} from "./components/viewer/sheets/sheet/sheet-component";
import {SheetsComponent} from "./components/viewer/sheets/sheets-component";
import {SliderComponent} from "./components/viewer/slider/slider-component";
import {ViewerComponent} from "./components/viewer/viewer-component";

@NgModule({
	imports:      [ BrowserModule ],
	declarations: [
		BookListItemComponent,
		BookListComponent,
		HeaderComponent,
		ScaleComponent,
		ThemeComponent,
		ThemesComponent,
		LeftComponent,
		RightComponent,
		SheetComponent,
		SheetsComponent,
		SliderComponent,
		ViewerComponent,
		SettingsItemSheetComponent,
		ColumnSettingsComponent,
		ColumnSettingsItemComponent,
		BookShelfComponent,
		AsyncStatePipe,
	],
	bootstrap:    [ BookShelfComponent ]
})

export class AppModule { }
