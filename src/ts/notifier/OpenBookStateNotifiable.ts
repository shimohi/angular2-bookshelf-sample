import {OpenBookState, OpenPageKey} from "../model/bookshelf-api";
import {Notifiable} from "./notifier-interfaces";
import {OpenBookStateImpl} from "../model/OpenBookStateImpl";
import {
	PageSpineInfoImpl, PageNumberInfoImpl, OpenPageKeyImplFactories
} from "../model/OpenPageKeyImpl";
import {OpenBookStateNotifier} from "./OpenBookStateNotifier";

export class OpenBookStateNotifiable implements OpenBookState, Notifiable {

	constructor(
		private notifier: OpenBookStateNotifier,
		private keyFactories: OpenPageKeyImplFactories,
		private state: OpenBookStateImpl,
	) { }

	createOpenPageSpineKey(): PageSpineInfoImpl {
		return this.keyFactories.pageSpineInfoFactory.createInstance();
	}
	createOpenPageNumberKey(): PageNumberInfoImpl {
		return this.keyFactories.pageNumberInfoFactory.createInstance();
	}

	get title(): string {
		return this.state.title;
	}

	set title(value: string) {
		this.state.title = value;
	}

	get contentsId(): string {
		return this.state.contentsId;
	}

	set contentsId(value: string) {
		this.state.contentsId = value;
	}

	get pageProgressionDirection() {
		return this.state.pageProgressionDirection;
	}

	set pageProgressionDirection(value) {
		this.state.pageProgressionDirection = value;
	}

	get renditionLayout() {
		return this.state.renditionLayout;
	}

	set renditionLayout(value) {
		this.state.renditionLayout = value;
	}

	get width(): number {
		return this.state.width;
	}

	set width(value: number) {
		this.state.width = value;
	}

	get height(): number {
		return this.state.height;
	}

	set height(value: number) {
		this.state.height = value;
	}

	get scale(): number {
		return this.state.scale;
	}

	set scale(value: number) {
		this.state.scale = value;
	}

	get pageCount(): number|any {
		return this.state.pageCount;
	}

	set pageCount(value: number|any) {
		this.state.pageCount = value;
	}

	get charCount(): number {
		return this.state.charCount;
	}

	set charCount(value: number) {
		this.state.charCount = value;
	}

	get headCharIndex(): number {
		return this.state.headCharIndex;
	}

	set headCharIndex(value: number) {
		this.state.headCharIndex = value;
	}

	get headSpineId(): string {
		return this.state.headSpineId;
	}

	set headSpineId(value: string) {
		this.state.headSpineId = value;
	}

	get headSpineCharIndex(): number {
		return this.state.headSpineCharIndex;
	}

	set headSpineCharIndex(value: number) {
		this.state.headSpineCharIndex = value;
	}

	get tailCharIndex(): number {
		return this.state.tailCharIndex;
	}

	set tailCharIndex(value: number) {
		this.state.tailCharIndex = value;
	}

	get tailSpineId(): string {
		return this.state.tailSpineId;
	}

	set tailSpineId(value: string) {
		this.state.tailSpineId = value;
	}

	get tailSpineCharIndex(): number {
		return this.state.tailSpineCharIndex;
	}

	set tailSpineCharIndex(value: number) {
		this.state.tailSpineCharIndex = value;
	}

	get openPages(): OpenPageKey[] {
		return this.state.openPages;
	}

	set openPages(val: OpenPageKey[]) {
		this.state.openPages = val;
	}

	get currentCharIndex(): number {
		return this.state.currentCharIndex;
	}

	set currentCharIndex(value: number) {
		this.state.currentCharIndex = value;
	}

	get currentSpineId(): string {
		return this.state.currentSpineId;
	}

	set currentSpineId(value: string) {
		this.state.currentSpineId = value;
	}

	get currentSpineCharIndex(): number {
		return this.state.currentSpineCharIndex;
	}

	set currentSpineCharIndex(value: number) {
		this.state.currentSpineCharIndex = value;
	}


	notify(): void {
		this.notifier.notify(this.state);
	}
}