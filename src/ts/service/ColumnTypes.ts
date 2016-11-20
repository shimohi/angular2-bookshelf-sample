export class ColumnType {

	readonly columnCount: number;
	readonly columnWidthPercent: number;
	readonly columnHeightPercent: number;
	readonly columns: Column[];

	constructor(
		columnCount: number,
		columnWidthPercent: number,
		columnHeightPercent: number,
		columns: Column[]
	) {
		this.columnCount = columnCount;
		this.columnWidthPercent = columnWidthPercent;
		this.columnHeightPercent = columnHeightPercent;
		this.columns = columns;

	}
}

export class Column {

	/**
	 * 段数
	 */
	readonly columnNumber: number;

	/**
	 * 表示対象かどうか
	 */
	readonly display: boolean;

	/**
	 * 親のwidthを100%とした場合のX座標 %指定
	 */
	readonly percentX: number;

	/**
	 * 親のheightを100%とした場合のX座標 %指定
	 */
	readonly percentY: number;

	// /**
	//  * 親のwidthを100%とした場合の幅 %指定
	//  */
	// readonly percentWidth: number;
	//
	// /**
	//  * 親のwidthを100%とした場合の高さ %指定
	//  */
	// readonly percentHeight: number;

	constructor(
		columnNumber: number,
		display: boolean,
		percentX: number,
		percentY: number
	) {
		this.columnNumber = columnNumber;
		this.display = display;
		this.percentX = percentX;
		this.percentY = percentY;
	}
}

export const COLUMN_TYPES: ColumnType[] = [

	// 1段組
	createColumnType(5, 1, 1, 0, 0, false, 16),

	// 2段組
	createColumnType(5, 2, 1, 4, 0, false, 16),

	// 4段組
	createColumnType(5, 2, 2, 4, 2, false, 16),

	// 6段組
	createColumnType(5, 2, 3, 4, 1, false, 16),

	// 8段組
	createColumnType(5, 2, 4, 4, 1, false, 16),

	// 12段組
	createColumnType(5, 3, 4, 3, 1, false, 16),

	// 16段組
	createColumnType(5, 4, 4, 3, 1, false, 16),
];

function createColumnType(
	padding: number,
	columns: number,
	rows: number,
	horizontalMargin: number,
	verticalMargin: number,
	leftToRight: boolean,
	count: number
) {

	const result: Column[] = [];
	const aliveCount = columns * rows;
	const width = ( 100 - padding * 2 - (columns - 1) * horizontalMargin ) / columns;
	const height = ( 100 - padding * 2 - (rows - 1) * verticalMargin) / rows;

	for (let i = 0; i < count; i++) {

		if (i >= aliveCount) {
			result[i] = new Column(i, false, 0, 0);
			continue;
		}
		let column =  ( i  / rows ) | 0;
		if (leftToRight === false) {
			column = columns - 1 - column;
		}
		let row = i % rows;
		result[i] = new Column(i, true,
			padding + column  * horizontalMargin + column * width,
			padding + row  * verticalMargin + row * height
		);
	}
	return new ColumnType(columns * rows, width, height, result);
	// return new ColumnType(columns * rows, (100 - padding * 2), (100 - padding * 2), result);
}