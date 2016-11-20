import {Notifiable} from "./notifier-interfaces";
import {ViewState} from "../model/bookshelf-api";
import {ViewStateImpl} from "../model/ViewStateImpl";
import {ViewStateNotifier} from "./ViewStateNotifier";

export class ViewStateNotifiable implements Notifiable, ViewState {

	get width(): number {
		return this.viewState.width;
	}

	set width(value: number) {
		this.viewState.width = value;
	}

	get height(): number {
		return this.viewState.height;
	}

	set height(value: number) {
		this.viewState.height = value;
	}

	get columnType(): number {
		return this.viewState.columnType;
	}

	set columnType(value: number) {
		this.viewState.columnType = value;
	}

	get theme(): string {
		return this.viewState.theme;
	}

	set theme(value: string) {
		this.viewState.theme = value;
	}

	get scale(): number {
		return this.viewState.scale;
	}

	set scale(value: number) {
		this.viewState.scale = value;
	}

	constructor(
		private notifier: ViewStateNotifier,
		private viewState: ViewStateImpl
	) {}

	notify(): void {
		this.notifier.notify(this.viewState);
	}
}
