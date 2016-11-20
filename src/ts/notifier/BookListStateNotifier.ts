import {Notifier, Revision} from "./notifier-interfaces";
import {BookListState} from "../model/bookshelf-api";
import {Observable, Subject, BehaviorSubject} from "rxjs";
import {Injectable} from "@angular/core";
import {BookListStateImplFactory} from "../model/BookListStateImpl";
import {BookListStateNotifiable} from "./BookListStateNotifiable";

@Injectable()
export class BookListStateNotifier implements Notifier<BookListState> {

	private revisionFactory: RevisionImplFactory;
	private subject: Subject<Revision<BookListState>>;
	private beforeState: BookListState;

	constructor(
		private bookListStateFactory: BookListStateImplFactory
	) {
		this.revisionFactory = new RevisionImplFactory();
		this.beforeState = this.bookListStateFactory.createInstance();

		const revision = this.revisionFactory.createInstance();
		revision.after = this.beforeState;
		this.subject = new BehaviorSubject<Revision<BookListState>>(
			revision
		);
	}

	getNotifiable(): BookListStateNotifiable {
		return new BookListStateNotifiable (
			this,
			this.bookListStateFactory.bookInfoFactory,
			this.beforeState == null ?
				this.bookListStateFactory.createInstance() :
				this.bookListStateFactory.clone(this.beforeState)
		);
	}

	notify(state: BookListState): void {

		const afterState = this.bookListStateFactory.clone(state);
		const revision = this.revisionFactory.createInstance();
		revision.before = this.beforeState;
		revision.after = afterState;

		this.subject.next(revision);
		this.beforeState = afterState;
	}

	get observable(): Observable<Revision<BookListState>> {
		return this.subject;
	}
}

class RevisionImpl implements Revision<BookListState> {
	before: BookListState;
	after: BookListState;
	constructor () {
		this.before = null;
		this.after = null;
	}
}
class RevisionImplFactory {
	createInstance(): RevisionImpl {
		return new RevisionImpl();
	}
}
