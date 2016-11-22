import {Observable} from "rxjs";
import "rxjs/add/operator/toPromise";
import { Injectable }    from "@angular/core";
import {OpenBookStateImpl} from "../model/OpenBookStateImpl";
import {OpenPageKey, PageNumberInfo, PageSpineInfo} from "../model/bookshelf-api";
import {PageInfo} from "./PageInfo";

@Injectable()
export class BookAccessor {

	constructor(
		// private bookState: OpenBookStateImpl
	) {

	}

	getSpineIds(): Promise<string[]> {
		return Promise.resolve(["a", "b"]);
	}

	changeBook(
		id: string
	): Promise<any> {
		return Promise.resolve({});
	}

	resize(
		width: number,
		height: number
	): Promise<any> {
		return Promise.resolve(null);
	}

	changeScale(
		scale: number
	): Promise<any> {
		return Promise.resolve(null);
	}

	getTitle(): Promise<string> {
		return Promise.resolve("title1");
	}

	getCharCount(): Promise<number> {
		return Promise.resolve(100);
	}

	getPageNumber(
		charIndex: number
	): Promise<number> {
		return Promise.resolve( ( charIndex / 20 ) | 0);
	}

	getPageCount(): Promise<number> {
		return Promise.resolve( 5 );
	}

	getPageInfo(pageKey: OpenPageKey): Promise<PageInfo> {

		let page: number;
		let spineId: string;
		let startCharIndex: number;
		let startCharIndexOfSpine: number;
		let endCharIndex: number;
		let endCharIndexOfSpine: number;

		if (pageKey.type === "pageNumber" ) {
			page = (<PageNumberInfo>pageKey).pageNumber;

		} else {

			spineId = (<PageSpineInfo>pageKey).spineId;
			let spinePage = (<PageSpineInfo>pageKey).pageOfSpine;

			if (spineId === "a") {
				page = spinePage;
			} else {
				page = spinePage + 2;
			}
		}

		switch (page) {
			case 0:
				spineId = "a";
				startCharIndexOfSpine = 0;
				startCharIndex = 0;
				endCharIndex = 20;
				endCharIndexOfSpine = 20;
				break;

			case 1:
				spineId = "a";
				startCharIndexOfSpine = 20;
				startCharIndex = 20;
				endCharIndex = 40;
				endCharIndexOfSpine = 40;
				break;

			case 2:
				spineId = "b";
				startCharIndexOfSpine = 0;
				startCharIndex = 40;
				endCharIndex = 60;
				endCharIndexOfSpine = 20;
				break;

			case 3:
				spineId = "b";
				startCharIndexOfSpine = 20;
				startCharIndex = 60;
				endCharIndex = 80;
				endCharIndexOfSpine = 40;
				break;

			case 4:
				spineId = "b";
				startCharIndexOfSpine = 40;
				startCharIndex = 80;
				endCharIndex = 100;
				endCharIndexOfSpine = 60;
				break;

		}

		return Promise.resolve({
			spineId: spineId,
			startCharIndex: startCharIndex,
			startCharIndexOfSpine: startCharIndexOfSpine,
			endCharIndex: endCharIndex,
			endCharIndexOfSpine: endCharIndexOfSpine
		});
	}

	getPage(pegeKey: OpenPageKey): Promise<any> {
		return Promise.resolve({});
	}

	getPageNumberOfSpine(
		spineId: string,
		charIndexOfSpine: number
	): Promise<number> {
		return Promise.resolve(spineId === "a" ? ( charIndexOfSpine / 20 ) | 0 : ( charIndexOfSpine / 20 ) | 0);
	}

	getSpineCharCount(
		spineId: string
	): Promise<number> {
		return Promise.resolve(spineId === "a" ? 40 : 60);
	}

	getSpinePageCount(
		spineId: string
	): Promise<number> {
		return Promise.resolve(spineId === "a" ? 2 : 3);
	}

	getPageProgressionDirection(): Promise<"ltr" | "rtl"> {
		return Promise.resolve("rtl");
	}

	getRenditionLayout(): Promise<"reflowable" | "pre-paginated"> {
		return Promise.resolve("reflowable");
	}
}
