import {OpenPageKey, PageNumberInfo, PageSpineInfo} from "./bookshelf-api";

interface CloneableFactory<K extends OpenPageKey> {
	clone(key: OpenPageKey): OpenPageKey;
}

export class PageNumberInfoImpl implements PageNumberInfo {

	/**
	 * キー種別
	 */
	readonly type: "pageNumber";

	/**
	 * ページ番号
	 */
	pageNumber: number;

	constructor() {
		this.pageNumber = 0;
		this.type = "pageNumber";
	}
}

export class PageNumberInfoImplFactory implements CloneableFactory<PageNumberInfoImpl> {

	createInstance(): PageNumberInfoImpl {
		return new PageNumberInfoImpl();
	}

	clone(pageInfo: PageNumberInfo): PageNumberInfoImpl {
		const cl = this.createInstance();
		cl.pageNumber = pageInfo.pageNumber;
		return cl;
	}
}

export class PageSpineInfoImpl implements PageSpineInfo {

	/**
	 * キー種別
	 */
	readonly type: "spineKey";

	/**
	 * SpineId
	 */
	spineId: string;

	/**
	 * Spine内でのページ数
	 */
	pageOfSpine: number;

	constructor() {
		this.type = "spineKey";
		this.spineId = null;
		this.pageOfSpine = 0;
	}
}

export class PageSpineInfoImplFactory implements CloneableFactory<PageSpineInfoImpl> {
	createInstance(): PageSpineInfoImpl {
		return new PageSpineInfoImpl();
	}
	clone(spineInfo: PageSpineInfo): PageSpineInfoImpl {
		const cl = this.createInstance();
		cl.spineId = spineInfo.spineId;
		cl.pageOfSpine = spineInfo.pageOfSpine;
		return cl;
	}

}

export class OpenPageKeyImplFactories {

	readonly pageSpineInfoFactory: PageSpineInfoImplFactory;
	readonly pageNumberInfoFactory: PageNumberInfoImplFactory;

	private factories: {[key: string]: CloneableFactory<any> };

	constructor() {

		this.pageSpineInfoFactory = new PageSpineInfoImplFactory();
		this.pageNumberInfoFactory = new PageNumberInfoImplFactory();

		this.factories = {
			"pageNumber": this.pageSpineInfoFactory,
			"spineKey": this.pageNumberInfoFactory
		};
	}

	clone(openKey: OpenPageKey): OpenPageKey {
		return this.factories[openKey.type].clone(openKey);
	}

}