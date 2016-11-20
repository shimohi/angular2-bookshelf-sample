export class Theme {

	name: string;
	constructor(name: string) {
		this.name = name;
	}
}

export class Themes {

	private _themes: Theme[];
	constructor() {
		this._themes = [
			new Theme("テーマ1"),
			new Theme("テーマ2"),
			new Theme("テーマ3"),
			new Theme("テーマ4")
		];
	}

	get themes(): Theme[] {
		return this._themes;
	}

}