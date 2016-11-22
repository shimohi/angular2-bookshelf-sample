import {OpenBookState, OpenPageKey} from "./bookshelf-api";
import {OpenPageKeyImplFactories} from "./OpenPageKeyImpl";
import {Injectable} from "@angular/core";

export class OpenBookStateImpl implements OpenBookState {

	/**
	 * タイトル
	 */
	title: string;

	/**
	 * ID
	 */
	contentsId: string;

	/**
	 * ページめくりの方向
	 */
	pageProgressionDirection: "ltr" | "rtl";

	/**
	 * 固定レイアウトかリフローか
	 */
	renditionLayout: "reflowable" | "pre-paginated";

	/**
	 * ページ幅
	 */
	width: number;

	/**
	 * ページ高さ
	 */
	height: number;

	/**
	 * 文字サイズ
	 */
	scale: number;

	/**
	 * 総ページ数
	 */
	pageCount: number | null;

	/**
	 * 総文字数
	 */
	charCount: number;

	/**
	 * 現在の文字インデックス
	 */
	currentCharIndex: number;

	/**
	 * 現在のSpine
	 */
	currentSpineId: string;

	/**
	 * 現在のSpine内での文字インデックス
	 */
	currentSpineCharIndex: number;

	/**
	 * 現在開いている先頭文字インデックス
	 */
	headCharIndex: number;

	/**
	 * 現在開いている先頭ページのSpineId
	 */
	headSpineId: string;

	/**
	 * 現在開いている先頭ページのSpine内でのPageNumber
	 */
	headSpineCharIndex: number;

	/**
	 * 現在開いている最終文字インデックス
	 */
	tailCharIndex: number;

	/**
	 * 現在開いている最終ページのSpineId
	 */
	tailSpineId: string;

	/**
	 * 現在開いている最終ページのSpine内でのPageNumber
	 */
	tailSpineCharIndex: number;

	/**
	 * 現在開いているページのキー情報
	 */
	openPages: OpenPageKey[];

	constructor() {

		this.title = null;
		this.contentsId = null;
		this.pageProgressionDirection = "rtl";
		this.renditionLayout =  "reflowable";
		this.width = 0;
		this.height = 0;
		this.scale = 1;
		this.pageCount = 0;
		this.charCount = 0;
		this.headCharIndex = 0;
		this.headSpineId = null;
		this.headSpineCharIndex = 0;
		this.tailCharIndex = 0;
		this.tailSpineId = null;
		this.tailSpineCharIndex = 0;
		this.openPages = [];
		this.currentCharIndex = 0;
		this.currentSpineId = null;
		this.currentSpineCharIndex = 0;
	}
}

@Injectable()
export class OpenBookStateImplFactory {

	constructor(
		private openKeyFactory: OpenPageKeyImplFactories
	) {

	}

	get keyFactory(): OpenPageKeyImplFactories {
		return this.openKeyFactory;
	}

	createInstance(): OpenBookStateImpl {
		return new OpenBookStateImpl();
	}

	clone(openBookState: OpenBookState): OpenBookStateImpl {

		const cl = this.createInstance();

		cl.title = openBookState.title;
		cl.contentsId = openBookState.contentsId;
		cl.pageProgressionDirection = openBookState.pageProgressionDirection;
		cl.renditionLayout = openBookState.renditionLayout;
		cl.width = openBookState.width;
		cl.height = openBookState.height;
		cl.scale = openBookState.scale;
		cl.pageCount = openBookState.pageCount;
		cl.charCount = openBookState.charCount;

		cl.currentCharIndex = openBookState.currentCharIndex;
		cl.currentSpineId = openBookState.currentSpineId;
		cl.currentSpineCharIndex = openBookState.currentSpineCharIndex;

		cl.headCharIndex = openBookState.headCharIndex;
		cl.headSpineId = openBookState.headSpineId;
		cl.headSpineCharIndex = openBookState.headSpineCharIndex;
		cl.tailCharIndex = openBookState.tailCharIndex;
		cl.tailSpineId = openBookState.tailSpineId;
		cl.tailSpineCharIndex = openBookState.tailSpineCharIndex;

		const len = openBookState.openPages.length;
		let i = 0 | 0;
		while (i < len) {
			cl.openPages[i] = this.openKeyFactory.clone(openBookState.openPages[i]);
			i = ( i + 1) | 0;
		}
		return cl;
	}
}