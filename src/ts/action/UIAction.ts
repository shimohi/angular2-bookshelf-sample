import {UIAction} from "./bookshelf-action-api";
import {UIStateNotifier} from "../notifier/UIStateNotifier";
import {Injectable} from "@angular/core";

@Injectable()
export class UIActionImpl implements UIAction {

	constructor(
		private uiStateNotifier: UIStateNotifier,
	) { }

	toggleSettings(): void {
		const state = this.uiStateNotifier.getNotifiable();
		if (state.openSettings === true) {
			state.openSettings = false;
			state.notify();
			return;
		}
		state.openSettings = true;
		state.notify();
	}

	openViewer(): void {
		const state = this.uiStateNotifier.getNotifiable();
		if (state.openBook === true) {
			return;
		}
		state.openBook = true;
		state.notify();
	}

	openBookList(): void {
		const state = this.uiStateNotifier.getNotifiable();
		if (state.openBook === false) {
			return;
		}
		state.openBook = false;
		state.notify();
	}

	openHeader(): void {
		const state = this.uiStateNotifier.getNotifiable();
		if (state.openHeader === true) {
			return;
		}
		state.openHeader = true;
		state.notify();
	}

	closeHeader(): void {
		const state = this.uiStateNotifier.getNotifiable();
		if (state.openHeader === false) {
			return;
		}
		state.openHeader = false;
		state.notify();
	}
}