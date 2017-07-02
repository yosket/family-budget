import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { State, User, Budget } from './models';
import 'rxjs/add/observable/of';

@Injectable()
export class StoreService {

  private state: State = new State();

  constructor() {
    const husband: User = new User('夫');
    const wife   : User = new User('妻');
    this.state.users.push(husband);
    this.state.users.push(wife);
  }

  getUsers(): Observable<User[]> {
    return Observable.of(this.state.users);
  }

  getBudgets(type: 'income' | 'outgo'): Observable<Budget[]> {
    return Observable.of(this.state.budgets[type]);
  }

  add(type: 'income' | 'outgo', budget: Budget) {
    this.state.budgets[type].push(budget);
  }
}
