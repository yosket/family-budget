import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { StoreService } from '../store.service';
import { User, Budget } from '../models';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  users: Observable<User[]>;
  budgets: {
    income: Observable<Budget[]>,
    outgo : Observable<Budget[]>
  };

  constructor(
    private router      : Router,
    private storeService: StoreService
  ) {}

  ngOnInit() {
    this.users = this.storeService.getUsers();
    this.budgets = {
      income: this.storeService.getBudgets('income'),
      outgo : this.storeService.getBudgets('outgo')
    };
  }

  getTotal(type: 'income' | 'outgo' | 'all' = 'all'): number {
    let total = 0;
    if (type === 'all') {
      return this.getTotal('income') - this.getTotal('outgo');
    }
    this.budgets[type].forEach(budget => {
      if (!budget.length) return;
      total = budget.map(b => b.price).reduce((p, c) => p + c);
    });
    return total;
  }

  finish() {
    Observable.forkJoin(this.users, this.budgets.income, this.budgets.outgo).subscribe(data => {
      const navigationExtras: NavigationExtras = { queryParams: {
        data: JSON.stringify(data)
      } };
      this.router.navigate(['result'], navigationExtras);
    });
  }
}
