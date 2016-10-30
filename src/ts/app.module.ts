import "./rxjs-extensions";
import { NgModule }      from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule }   from "@angular/forms";
import { HttpModule }    from "@angular/http";
import { AppRoutingModule } from "./app-routing.module";
// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from "angular-in-memory-web-api";
import { InMemoryDataService }  from "./model/in-memory-data.service";
import { AppComponent }         from "./components/header/header";
import { DashboardComponent }   from "./components/dashbord/dashboard";
import { HeroesComponent }      from "./components/heroes/heroes";
import { HeroDetailComponent }  from "./components/hero-detail/hero-detail";
import { HeroService }          from "./model/hero.service";
import { HeroSearchComponent }  from "./components/hero-search/hero-search";


@NgModule({
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		InMemoryWebApiModule.forRoot(InMemoryDataService),
		AppRoutingModule
	],
	declarations: [
		AppComponent,
		DashboardComponent,
		HeroDetailComponent,
		HeroesComponent,
		HeroSearchComponent
	],
	providers: [ HeroService ],
	bootstrap: [ AppComponent ]
})
export class AppModule { }
