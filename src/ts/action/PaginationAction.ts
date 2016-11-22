import {BookAccessor} from "../service/BookAccessor";
import {OpenBookStateNotifiable} from "../notifier/OpenBookStateNotifiable";
import {ViewStateNotifiable} from "../notifier/ViewStateNotifiable";
import * as ColumnTypes from "../service/ColumnTypes";

export function refresh(
	viewState: ViewStateNotifiable,
	bookAccessor: BookAccessor,
	bookState: OpenBookStateNotifiable
): void {

	const type = ColumnTypes.COLUMN_TYPES[viewState.columnType];
	const columnCount = type.columnCount;
	if ( columnCount === 1 ) {
		refreshBySpineInfo(bookAccessor, bookState);
		return;
	}
	refreshByPageNumber(columnCount, bookAccessor, bookState);
}

export function movePage(
	viewState: ViewStateNotifiable,
	bookAccessor: BookAccessor,
	bookState: OpenBookStateNotifiable
): void {

	const type = ColumnTypes.COLUMN_TYPES[viewState.columnType];
	const columnCount = type.columnCount;
	if ( columnCount === 1 ) {
		movePageBySpineKey(bookAccessor, bookState);
		return;
	}
	movePageByPageNumber(columnCount, bookAccessor, bookState);
}

/**
 * Spine情報ベースのキー設定を行います。
 * @param bookAccessor
 * @param bookState
 */
function refreshBySpineInfo(
	bookAccessor: BookAccessor,
	bookState: OpenBookStateNotifiable
): void {

	movePageBySpineKey(bookAccessor, bookState).then(() => {
		return bookAccessor.getPageCount();
	}).then((pageCount) => {

		// ページカウントの設定

		bookState.pageCount = pageCount;
		bookState.notify();

	});
}

function movePageBySpineKey(
	bookAccessor: BookAccessor,
	bookState: OpenBookStateNotifiable
): Promise<any> {

	const spineId = bookState.currentSpineId;
	const charIndexOfSpine = bookState.currentSpineCharIndex;

	return bookAccessor.getPageNumberOfSpine(spineId, charIndexOfSpine).then((pageNumberOfSpine) => {

		// ページキーの設定

		const key = bookState.createOpenPageSpineKey();
		key.spineId = spineId;
		key.pageOfSpine = pageNumberOfSpine;
		bookState.openPages = [];
		bookState.openPages.push(key);

		return bookAccessor.getPageInfo(key);

	}).then((pageInfo) => {

		if (pageInfo == null) {

			bookState.headSpineId = null;
			bookState.headSpineCharIndex = 0;
			bookState.headCharIndex = 0;
			bookState.tailSpineId = null;
			bookState.tailSpineCharIndex = 0;
			bookState.tailCharIndex = 0;
			return null;

		}

		// ページ開始・終了位置の設定

		bookState.headSpineId = pageInfo.spineId;
		bookState.headSpineCharIndex = pageInfo.startCharIndexOfSpine;
		bookState.headCharIndex = pageInfo.startCharIndex;
		bookState.tailSpineId = pageInfo.spineId;
		bookState.tailSpineCharIndex = pageInfo.endCharIndexOfSpine;
		bookState.tailCharIndex = pageInfo.endCharIndex;

		bookState.notify();
		return null;

	});

}

/**
 * ページ番号ベースのキー設定を行います。
 * @param columnCount
 * @param bookAccessor
 * @param bookState
 */
function refreshByPageNumber(
	columnCount: number,
	bookAccessor: BookAccessor,
	bookState: OpenBookStateNotifiable
): void {

	bookAccessor.getPageCount().then((count) => {

		// ページカウントの設定
		bookState.pageCount = count;
		movePageByPageNumber(columnCount, bookAccessor, bookState).then();

	});

}

function movePageByPageNumber(
	columnCount: number,
	bookAccessor: BookAccessor,
	bookState: OpenBookStateNotifiable
): Promise<any> {

	const charIndex = bookState.currentCharIndex;
	return bookAccessor.getPageNumber(charIndex).then((pageNumber) => {

		// ページキーの設定

		const mod = ( pageNumber % columnCount );
		const start = ( pageNumber - mod );
		bookState.openPages = [];
		for (let i = 0; i < columnCount; i++) {

			if (start + i >= bookState.pageCount) {
				break;
			}
			const pageKey = bookState.createOpenPageNumberKey();
			pageKey.pageNumber = start + i;
			bookState.openPages[i] = pageKey;

		}
		if (bookState.openPages.length === 0) {
			return null;
		}
		return bookAccessor.getPageInfo(bookState.openPages[0]);

	}).then((startInfo) => {

		if ( startInfo == null ) {
			bookState.headCharIndex = 0;
			bookState.headSpineCharIndex = 0;
			bookState.headSpineId = null;
			return null;
		}

		// 開始位置の設定

		bookState.headCharIndex = startInfo.startCharIndex;
		bookState.headSpineId = startInfo.spineId;
		bookState.headSpineCharIndex = startInfo.startCharIndexOfSpine;
		return bookAccessor.getPageInfo(bookState.openPages[bookState.openPages.length - 1]);

	}).then((endInfo) => {

		if ( endInfo == null ) {
			bookState.tailCharIndex = 0;
			bookState.tailSpineCharIndex = 0;
			bookState.tailSpineId = null;

			bookState.notify();
			return;
		}

		// 終了位置の設定

		bookState.tailCharIndex = endInfo.endCharIndex;
		bookState.tailSpineId = endInfo.spineId;
		bookState.tailSpineCharIndex = endInfo.endCharIndexOfSpine;

		bookState.notify();
	});


}