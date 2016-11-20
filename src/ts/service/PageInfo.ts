export interface PageInfo {

	/**
	 * SpineId
	 */
	readonly spineId: string;

	/**
	 * 開始文字インデックス
	 */
	readonly startCharIndex: number;

	/**
	 * Spine内での開始文字インデックス
	 */
	readonly startCharIndexOfSpine: number;

	/**
	 * 終了文字インデックス
	 */
	readonly endCharIndex: number;

	/**
	 * Spine内での終了文字インデックス
	 */
	readonly endCharIndexOfSpine: number;

}