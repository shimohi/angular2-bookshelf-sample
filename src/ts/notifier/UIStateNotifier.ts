import {Notifier, Revision} from "./notifier-interfaces";
import {BookListState, UIState} from "../model/bookshelf-api";
import {Observable, Subject, BehaviorSubject} from "rxjs";
import {Injectable} from "@angular/core";
import {UIStateImplFactory} from "../model/UIStateImpl";
import {UIStateNotifiable} from "./UIStateNotifiable";

@Injectable()
export class UIStateNotifier implements Notifier<UIState> {

	private revisionFactory: RevisionImplFactory;
	private subject: Subject<Revision<UIState>>;
	private beforeState: UIState;

	constructor(
		private uiStateFactory: UIStateImplFactory
	) {
		this.revisionFactory = new RevisionImplFactory();
		this.subject = new Subject<Revision<UIState>>();

		this.beforeState = this.uiStateFactory.createInstance();
		const revision = this.revisionFactory.createInstance();
		revision.after = this.beforeState;
		this.subject = new BehaviorSubject<Revision<UIState>>(
			revision
		);
	}

	getNotifiable(): UIStateNotifiable {
		return new UIStateNotifiable (
			this,
			this.beforeState == null ?
				this.uiStateFactory.createInstance() :
				this.uiStateFactory.clone(this.beforeState)
		);
	}

	notify(state: UIState): void {

		const afterState = this.uiStateFactory.clone(state);
		const revision = this.revisionFactory.createInstance();
		revision.before = this.beforeState;
		revision.after = afterState;

		this.subject.next(revision);
		this.beforeState = afterState;
	}

	get observable(): Observable<Revision<UIState>> {
		return this.subject;
	}
}

class RevisionImpl implements Revision<UIState> {
	before: UIState;
	after: UIState;
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
