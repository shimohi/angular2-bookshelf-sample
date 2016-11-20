import { UIState } from "./bookshelf-api";

export class UIStateImpl implements UIState {

	/**
	 * 設定画面を開いているかどうか
	 */
	openSettings: boolean;

	/**
	 * 書籍を開いているかどうか
	 */
	openBook: boolean;

	/**
	 * ヘッダーを開いているかどうか
	 */
	openHeader: boolean;

	constructor() {
		this.openBook = false;
		this.openSettings = false;
		this.openHeader = false;
	}
}

export class UIStateImplFactory {

	constructor() { }

	createInstance(): UIStateImpl {
		return new UIStateImpl();
	}

	clone(uiState: UIState): UIStateImpl {
		const cl = this.createInstance();

		cl.openHeader = uiState.openHeader;
		cl.openBook = uiState.openBook;
		cl.openSettings = uiState.openSettings;

		return cl;
	}
}
