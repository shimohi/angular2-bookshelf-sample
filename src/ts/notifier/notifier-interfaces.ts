import {Observable} from "rxjs";

export interface Notifiable {
	notify(): void;
}

export interface Notifier<S> {
	notify(state: S): void;
	observable: Observable<Revision<S>>;
}

export interface Revision<S> {
	before: S;
	after: S;
}
