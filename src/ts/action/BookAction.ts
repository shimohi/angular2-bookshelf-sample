import {BookAction} from "./bookshelf-action-api";
import {BookAccessor} from "../service/BookAccessor";
import {OpenBookStateNotifier} from "../notifier/OpenBookStateNotifier";
import {ViewStateNotifier} from "../notifier/ViewStateNotifier";
import * as Pagination from "./PaginationAction";
import {Injectable} from "@angular/core";

@Injectable()
export class BookActionImpl implements BookAction {

	private spineIds: string[];
	private spineIndexMap: {[key: string]: number};

	constructor(
		private viewStateNotifier: ViewStateNotifier,
		private bookStateNotifier: OpenBookStateNotifier,
		private bookAccessor: BookAccessor
	) { }

	changeBook(bookId: string): void {

		const bookState = this.bookStateNotifier.geNotifiable();
		bookState.currentCharIndex = 0;
		bookState.currentSpineCharIndex = 0;

		this.bookAccessor.changeBook(bookId).then(() => {

			// bookIdの設定

			bookState.contentsId = bookId;
			return this.bookAccessor.getTitle();

		}).then((title) => {

			// Titleの設定

			bookState.title = title;
			return this.bookAccessor.getSpineIds();

		}).then((spineIds) => {

			// Spineの設定

			this.spineIds = spineIds;
			const map: {[key: string]: number} = {};
			this.spineIndexMap = map;
			const len = spineIds.length;
			for (let i = 0 ; i < len; i++) {
				map[spineIds[i]] = i;
			}
			bookState.currentSpineId = spineIds[0];
			return this.bookAccessor.getPageProgressionDirection();

		}).then((pageProgressionDirection) => {

			// pageProgressionDirectionの設定

			bookState.pageProgressionDirection = pageProgressionDirection;
			return this.bookAccessor.getRenditionLayout();
		}).then((renditionLayout) => {

			// renditionLayoutの設定
			bookState.renditionLayout = renditionLayout;

			// ページリフレッシュ
			Pagination.refresh(
				this.viewStateNotifier.getNotifiable(),
				this.bookAccessor,
				bookState
			);

		});

	}

	toPrev(): void {

		const bookState = this.bookStateNotifier.geNotifiable();
		if (bookState.headCharIndex <= 0) {
			return;
		}

		bookState.currentCharIndex = bookState.headCharIndex - 1;
		if (bookState.headSpineCharIndex > 0) {

			bookState.currentSpineCharIndex = bookState.headSpineCharIndex - 1;

			// ページリフレッシュ
			Pagination.movePage(
				this.viewStateNotifier.getNotifiable(),
				this.bookAccessor,
				bookState
			);
			return;
		}

		const spineId = this.spineIds[this.spineIndexMap[bookState.headSpineId] - 1];

		bookState.currentSpineId
			= spineId;

		this.bookAccessor.getSpineCharCount(spineId).then((count) => {
			bookState.currentSpineCharIndex = count - 1;

			// ページリフレッシュ

			Pagination.movePage(
				this.viewStateNotifier.getNotifiable(),
				this.bookAccessor,
				bookState
			);
		});
	}

	toNext(): void {

		const bookState = this.bookStateNotifier.geNotifiable();
		if (bookState.tailCharIndex >= bookState.charCount) {
			return;
		}

		bookState.currentCharIndex = bookState.tailCharIndex;
		this.bookAccessor.getSpineCharCount(bookState.currentSpineId).then((count) => {

			if (bookState.tailSpineCharIndex < count) {
				bookState.currentSpineCharIndex = bookState.tailSpineCharIndex;

				Pagination.movePage(
					this.viewStateNotifier.getNotifiable(),
					this.bookAccessor,
					bookState
				);
				return;

			}

			bookState.currentSpineId = this.spineIds[this.spineIndexMap[bookState.headSpineId] + 1];
			bookState.currentSpineCharIndex = 0;

			Pagination.movePage(
				this.viewStateNotifier.getNotifiable(),
				this.bookAccessor,
				bookState
			);
		});

	}

	jump(progress: number): void {

		const bookState = this.bookStateNotifier.geNotifiable();
		if ( bookState.pageCount == null ) {
			return;
		}

		const pageNumber = ( bookState.pageCount * progress / 100 + 0.5 ) | 0;
		const key = bookState.createOpenPageNumberKey();
		key.pageNumber = pageNumber;

		this.bookAccessor.getPageInfo(key).then((info) => {

			bookState.currentCharIndex = info.startCharIndex;
			bookState.currentSpineId = info.spineId;
			bookState.currentSpineCharIndex = info.startCharIndexOfSpine;
			Pagination.movePage(
				this.viewStateNotifier.getNotifiable(),
				this.bookAccessor,
				bookState
			);

			Pagination.movePage(
				this.viewStateNotifier.getNotifiable(),
				this.bookAccessor,
				bookState
			);

		});

	}
}