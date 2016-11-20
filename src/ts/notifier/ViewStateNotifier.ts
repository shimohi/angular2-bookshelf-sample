import {Notifier, Revision} from "./notifier-interfaces";
import {ViewState} from "../model/bookshelf-api";
import {Observable, Subject, BehaviorSubject} from "rxjs";
import {ViewStateImplFactory} from "../model/ViewStateImpl";
import {Injectable} from "@angular/core";
import {ViewStateNotifiable} from "./ViewStateNotifiable";

@Injectable()
export class ViewStateNotifier implements Notifier<ViewState> {

	private revisionFactory: RevisionImplFactory;
	private subject: Subject<Revision<ViewState>>;
	private beforeState: ViewState;

	constructor(
		private viewStateFactory: ViewStateImplFactory
	) {
		this.revisionFactory = new RevisionImplFactory();
		this.subject = new Subject<Revision<ViewState>>();

		this.beforeState = this.viewStateFactory.createInstance();
		const revision = this.revisionFactory.cleateInstance();
		revision.after = this.beforeState;
		this.subject = new BehaviorSubject<Revision<ViewState>>(
			revision
		);
	}

	getNotifiable(): ViewStateNotifiable {
		return new ViewStateNotifiable (
			this,
			this.beforeState == null ?
				this.viewStateFactory.createInstance() :
				this.viewStateFactory.clone(this.beforeState)
		);
	}

	notify(state: ViewState): void {
		const afterState = this.viewStateFactory.clone(state);
		const revision = this.revisionFactory.cleateInstance();
		revision.before = this.beforeState;
		revision.after = afterState;

		this.subject.next(revision);
		this.beforeState = afterState;
	}

	get observable(): Observable<Revision<ViewState>> {
		return this.subject;
	}
}

class RevisionImpl implements Revision<ViewState> {
	before: ViewState;
	after: ViewState;
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
