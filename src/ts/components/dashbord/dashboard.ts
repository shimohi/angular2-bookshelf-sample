import { Component, OnInit } from "@angular/core";

import { Page } from "../../model/page";
import { HeroService } from "../../model/hero.service";

@Component({
	moduleId: module.id,
	selector: "my-dashboard",
	templateUrl: "dashboard.html",
	styleUrls: [ "dashboard.css" ]
})
export class DashboardComponent implements OnInit {

	pages: Page[] = [];
	constructor(private heroService: HeroService) { }

	ngOnInit(): void {
		this.heroService.getHeroes()
			.then(heroes => this.pages = heroes.slice(1, 5));
	}

	gotoDetail(book: Page): void { /* not implemented yet */}
}
