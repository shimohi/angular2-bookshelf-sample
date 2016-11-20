export interface UIState {

	/**
	 * 設定画面を開いているかどうか
	 */
	readonly openSettings: boolean;

	/**
	 * 書籍を開いているかどうか
	 */
	readonly openBook: boolean;

	/**
	 * ヘッダーを開いているかどうか
	 */
	readonly openHeader: boolean;

}

export interface BookListState {

	/**
	 * 現在表示可能な書籍のリスト
	 */
	readonly viewList: BookInfo[];

}

export interface BookInfo {

	/**
	 * 書籍名
	 */
	readonly title: string;

	/**
	 * 書籍ID
	 */
	readonly id: string;
}

export interface ViewState {

	/**
	 * Viewerフレームの表示幅
	 */
	readonly width: number;

	/**
	 * Viewerフレームの表示高さ
	 */
	readonly height: number;

	/**
	 * 表示段数
	 */
	readonly columnType: number;

	/**
	 * テーマ名
	 */
	readonly theme: string;

	/**
	 * 文字の拡大・縮小率
	 */
	readonly scale: number;
}

/**
 * 現在開いている文書の状態
 */
export interface OpenBookState {

	/**
	 * タイトル
	 */
	readonly title: string;

	/**
	 * ID
	 */
	readonly contentsId: string;

	/**
	 * ページめくりの方向
	 */
	readonly pageProgressionDirection: "ltr" | "rtl";

	/**
	 * 固定レイアウトかリフローか
	 */
	readonly renditionLayout: "reflowable" | "pre-paginated";

	/**
	 * ページ幅
	 */
	readonly width: number;

	/**
	 * ページ高さ
	 */
	readonly height: number;

	/**
	 * 文字サイズ
	 */
	readonly scale: number;

	/**
	 * 総ページ数
	 */
	readonly pageCount: number | null;

	/**
	 * 総文字数
	 */
	readonly charCount: number;

	/**
	 * 現在の文字インデックス
	 */
	readonly currentCharIndex: number;

	/**
	 * 現在のSpineId
	 */
	readonly currentSpineId: string;

	/**
	 * 現在のSpine毎の文字インデックス
	 */
	readonly currentSpineCharIndex: number;

	/**
	 * 現在開いている先頭文字インデックス
	 */
	readonly headCharIndex: number;

	/**
	 * 現在開いている先頭ページのSpineId
	 */
	readonly headSpineId: string;

	/**
	 * 現在開いている先頭ページのSpine内でのPageNumber
	 */
	readonly headSpineCharIndex: number;

	/**
	 * 現在開いている最終文字インデックス
	 */
	readonly tailCharIndex: number;

	/**
	 * 現在開いている最終ページのSpineId
	 */
	readonly tailSpineId: string;

	/**
	 * 現在開いている最終ページのSpine内でのPageNumber
	 */
	readonly tailSpineCharIndex: number;

	/**
	 * 現在開いているページのキー情報
	 */
	readonly openPages: OpenPageKey[];
}

/**
 * ページを開くためのキー
 */
export interface OpenPageKey {

	/**
	 * キー種別
	 */
	readonly type: "pageNumber" | "spineKey";
}

/**
 * ページ番号を指定するキー
 */
export interface PageNumberInfo extends OpenPageKey {

	/**
	 * キー種別
	 */
	readonly type: "pageNumber";

	/**
	 * ページ番号
	 */
	readonly pageNumber: number;

}

/**
 * Spineを指定するキー
 */
export interface PageSpineInfo extends OpenPageKey {

	/**
	 * キー種別
	 */
	readonly type: "spineKey";

	/**
	 * SpineId
	 */
	readonly spineId: string;

	/**
	 * Spine内でのページ数
	 */
	readonly pageOfSpine: number;
}
