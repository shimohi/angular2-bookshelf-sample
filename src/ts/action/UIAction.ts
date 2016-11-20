import {UIAction} from "./bookshelf-action-api";
import {UIStateNotifier} from "../notifier/UIStateNotifier";
import {Injectable} from "@angular/core";


@Injectable()
export class UIActionImpl implements UIAction {

	constructor(
		private uiStateNotifier: UIStateNotifier,
	) { }

	openSettings(): void {
		const state = this.uiStateNotifier.getNotifiable();
		if (state.openSettings === true) {
			return;
		}
		state.openSettings = true;
		state.notify();
	}

	closeSettings(): void {
		const state = this.uiStateNotifier.getNotifiable();
		if (state.openSettings === false) {
			return;
		}
		state.openSettings = false;
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