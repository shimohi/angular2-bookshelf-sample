import {Notifier, Revision} from "./notifier-interfaces";
import {OpenBookState} from "../model/bookshelf-api";
import {Observable, Subject, BehaviorSubject} from "rxjs";
import {OpenBookStateImplFactory} from "../model/OpenBookStateImpl";
import {Injectable} from "@angular/core";
import {OpenBookStateNotifiable} from "./OpenBookStateNotifiable";

@Injectable()
export class OpenBookStateNotifier implements Notifier<OpenBookState> {

	private revisionFactory: RevisionImplFactory;
	private subject: Subject<Revision<OpenBookState>>;
	private beforeState: OpenBookState;

	constructor(
		private bookStateFactory: OpenBookStateImplFactory
	) {
		this.revisionFactory = new RevisionImplFactory();
		this.subject = new Subject<Revision<OpenBookState>>();

		const revision = this.revisionFactory.cleateInstance();
		this.beforeState = this.bookStateFactory.createInstance();
		revision.after = this.beforeState;
		this.subject = new BehaviorSubject<Revision<OpenBookState>>(
			revision
		);
	}

	geNotifiable(): OpenBookStateNotifiable {
		return new OpenBookStateNotifiable (
			this,
			this.bookStateFactory.keyFactory,
			this.beforeState == null ?
				this.bookStateFactory.createInstance() :
				this.bookStateFactory.clone(this.beforeState)
		);
	}

	notify(state: OpenBookState): void {

		const afterState = this.bookStateFactory.clone(state);
		const revision = this.revisionFactory.cleateInstance();
		revision.before = this.beforeState;
		revision.after = afterState;

		this.subject.next(revision);
		this.beforeState = afterState;
	}

	get observable(): Observable<Revision<OpenBookState>> {
		return this.subject;
	}
}

class RevisionImpl implements Revision<OpenBookState> {
	before: OpenBookState;
	after: OpenBookState;
	constructor () {
		this.before = null;
		this.after = null;
	}
}

class RevisionImplFactory {
	cleateInstance(): RevisionImpl {
		return new RevisionImpl();
	}
}
