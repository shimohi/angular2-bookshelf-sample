import {Observable, Subscription} from "rxjs";
import {ChangeDetectorRef, Pipe, PipeTransform, OnDestroy} from "@angular/core";

@Pipe({
	name: "asyncState",
	pure: false
})
export class AsyncStatePipe<T> implements PipeTransform, OnDestroy {

	private subscription: Subscription;
	private latestValue: T | null = null;

	constructor(private cd: ChangeDetectorRef) { }

	ngOnDestroy() {
		if (this.subscription) { this.subscription.unsubscribe(); }
	}

	transform(observable: Observable<T>): T | null {

		if ( observable == null ) {
			return null;
		}
		if (!this.subscription) {
			/* should pass here only for the first-time. */
			this.subscription = observable
				.subscribe(state => { // ★★★
					this.latestValue = state;
					this.cd.markForCheck();
				});
		}
		return this.latestValue;
	}
}