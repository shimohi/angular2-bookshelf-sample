export interface UIAction {

	toggleSettings(): void;

	// closeSettings(): void;

	openViewer(): void;

	openBookList(): void;

	openHeader(): void;

	closeHeader(): void;

}

/**
 * Viewer設定に関するアクション
 */
export interface ViewerSettingsAction {

	/**
	 * テーマの変更
	 * @param themeName
	 */
	changeRenderingTheme(
		themeName: string
	): void;

	/**
	 * 文字サイズの変更
	 * @param scale
	 */
	changeScale(
		scale: number
	): void;

	/**
	 * ルート要素の幅・高さを設定
	 * @param width
	 * @param height
	 */
	resize(
		width: number,
		height: number
	): void;

	/**
	 * 段数を設定
	 * @param columnType
	 */
	changeColumnType(
		columnType: number
	): void;
}

/**
 * 書棚に対するアクション
 */
export interface BookShelfAction {

	/**
	 * 書棚リストを更新する。
	 */
	requestBookList(): void;
}

/**
 * 書籍Viewに対するアクション
 */
export interface BookAction {

	/**
	 * 書籍を変更する。
	 * @param bookId
	 */
	changeBook(bookId: string): void;

	/**
	 * 前ページへ戻る。
	 */
	toPrev(): void;

	/**
	 * 次ページへ進める。
	 */
	toNext(): void;

	/**
	 * 指定する箇所をJumpする。
	 * @param progress
	 */
	jump(progress: number): void;
}

