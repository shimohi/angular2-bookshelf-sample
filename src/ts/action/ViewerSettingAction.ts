import {ViewerSettingsAction} from "./bookshelf-action-api";
import {ViewStateNotifier} from "../notifier/ViewStateNotifier";
import {BookAccessor} from "../service/BookAccessor";
import * as ColumnTypes from "../service/ColumnTypes";
import {OpenBookStateNotifier} from "../notifier/OpenBookStateNotifier";
import * as Pagination from "./PaginationAction";
import {ViewStateNotifiable} from "../notifier/ViewStateNotifiable";
import {Injectable} from "@angular/core";


@Injectable()
export class ViewerSettingActionImpl implements ViewerSettingsAction {

	constructor(
		private viewStateNotifier: ViewStateNotifier,
		private bookStateNotifier: OpenBookStateNotifier,
		private bookAccessor: BookAccessor
	) { }

	changeRenderingTheme(themeName: string): void {
		const state = this.viewStateNotifier.getNotifiable();
		state.theme = themeName;
		state.notify();
	}

	changeScale(scale: number): void {
		const state = this.viewStateNotifier.getNotifiable();
		const bookState = this.bookStateNotifier.geNotifiable();

		this.bookAccessor.changeScale(scale).then(() => {
			state.scale = scale;
			Pagination.refresh(
				state,
				this.bookAccessor,
				bookState
			);

		});
	}

	resize(width: number, height: number): void {

		const viewState = this.viewStateNotifier.getNotifiable();
		viewState.width = width;
		viewState.height = height;
		this.refreshWithResize(viewState);

	}

	changeColumnType(columnType: number): void {

		const viewState = this.viewStateNotifier.getNotifiable();
		viewState.columnType = columnType;
		this.refreshWithResize(viewState);
		viewState.notify();

	}

	refreshWithResize(
		viewState: ViewStateNotifiable
	): void {

		const bookState = this.bookStateNotifier.geNotifiable();
		const type = ColumnTypes.COLUMN_TYPES[viewState.columnType];

		const columnWidth = ( viewState.width * type.columnWidthPercent / 100 + 0.5 ) | 0;
		const columnHeight = ( viewState.height * type.columnHeightPercent / 100 + 0.5 ) | 0;

		this.bookAccessor.resize(columnWidth, columnHeight).then(() => {

			bookState.width = columnWidth;
			bookState.height = columnHeight;

			return this.bookAccessor.resize(columnWidth, columnHeight);

		}).then(() => {

			Pagination.refresh(
				viewState,
				this.bookAccessor,
				bookState
			);

		});

	}
}