import {ViewState} from "./bookshelf-api";

export class ViewStateImpl implements ViewState {

	/**
	 * Viewerフレームの表示幅
	 */
	width: number;

	/**
	 * Viewerフレームの表示高さ
	 */
	height: number;

	/**
	 * 表示段数
	 */
	columnType: number;

	/**
	 * テーマ名
	 */
	theme: string;

	/**
	 * 文字の拡大・縮小率
	 */
	scale: number;

	constructor() {
		this.width = 0;
		this.height = 0;
		this.columnType = 1;
		this.theme = null;
		this.scale = 1;
	}

}

export class ViewStateImplFactory {

	createInstance(): ViewStateImpl {
		return new ViewStateImpl();
	}

	clone(
		viewState: ViewState
	): ViewStateImpl {
		const cl = this.createInstance();

		cl.width = viewState.width;
		cl.height = viewState.height;
		cl.columnType = viewState.columnType;
		cl.theme = viewState.theme;
		cl.scale = viewState.scale;
		return cl;
	}
}
