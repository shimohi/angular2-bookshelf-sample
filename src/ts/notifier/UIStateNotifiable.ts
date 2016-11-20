import {UIState} from "../model/bookshelf-api";
import {Notifiable} from "./notifier-interfaces";
import {UIStateImpl} from "../model/UIStateImpl";
import {UIStateNotifier} from "./UIStateNotifier";

export class UIStateNotifiable implements Notifiable, UIState {

	constructor(
		private uiStateNotifier: UIStateNotifier,
		private state: UIStateImpl
	) {}

	/**
	 * 設定画面を開いているかどうか
	 */
	get openSettings(): boolean {
		return this.state.openSettings;
	}
	set openSettings(val: boolean) {
		this.state.openSettings = val;
	}

	/**
	 * 書籍を開いているかどうか
	 */
	get openBook(): boolean {
		return this.state.openBook;
	}
	set openBook(val: boolean) {
		this.state.openBook = val;
	}

	/**
	 * ヘッダーを開いているかどうか
	 */
	get openHeader(): boolean {
		return this.state.openHeader;
	}
	set openHeader(val: boolean) {
		this.state.openHeader = val;
	}

	notify(): void {
		this.uiStateNotifier.notify(this.state);
	}
}