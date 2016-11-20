import "./rxjs-extensions";
import { NgModule }      from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule }   from "@angular/forms";
import {BookShelfModule} from "./components/bookshelf-module";
import {BookShelfComponent} from "./components/bookshelf-component";
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


import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }   from './app.component';
import {ColumnSettingsItemComponent} from "./components/column-settings/item/column-settings-item-component";
import {ColumnSettingsComponent} from "./components/column-settings/column-settings-component";
import {SettingsItemSheetComponent} from "./components/column-settings/item/sheet/settings-item-sheet-component";
import {AsyncStatePipe} from "./components/ObservablePipe";

@NgModule({
	imports:      [ BrowserModule ],
	declarations: [
		SettingsItemSheetComponent,
		ColumnSettingsComponent,
		ColumnSettingsItemComponent,
		BookShelfComponent,
		AsyncStatePipe,
	],
	bootstrap:    [ BookShelfComponent ]
})

export class AppModule { }
