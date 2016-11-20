import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: '<p>My name is <strong>{{ name | capitalize }}</strong>.</p>',
})
export class AppComponent {
  name = 'john doe';
}
