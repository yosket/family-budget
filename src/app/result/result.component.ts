import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User, Budget } from '../models';

interface Total {
  income: number;
  outgo: number;
}

interface UserTotal {
  [username: string]: Total;
}

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  users: User[];
  budgets: {
    income: Budget[],
    outgo : Budget[]
  };
  total: Total;
  userTotal: UserTotal;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const data = JSON.parse(params.data);
      this.users = data[0].map(data => new User(data.name));
      this.budgets = { income: [], outgo: [] };
      this.budgets.income = data[1].map(data => new Budget(data.title, data.price, this.users.find(user => user.name === data.user.name)));
      this.budgets.outgo = data[2].map(data => new Budget(data.title, data.price, this.users.find(user => user.name === data.user.name)));
      this.calc();
    });
  }

  calc() {
    this.total = this.sum(this.budgets);
    this.userTotal = this.getUserTotal(this.users, this.budgets);
  }

  sum(budgets: { income: Budget[], outgo: Budget[] }): Total {
    const income = this.budgets.income
      .map(i => i.price)
      .reduce((p, c) => p + c);
    const outgo = this.budgets.outgo
      .map(i => i.price)
      .reduce((p, c) => p + c);
    return { income, outgo };
  }

  getUserTotal(users: User[], budgets: { income: Budget[], outgo: Budget[] }): UserTotal {
    const userTotal = {};
    users.forEach(user => {
      const userIncome = budgets.income
        .filter(budget => budget.user === user)
        .map(budget => budget.price)
        .reduce((p, c) => p + c, 0);
      const userOutgo = budgets.outgo
        .filter(budget => budget.user === user)
        .map(budget => budget.price)
        .reduce((p, c) => p + c, 0);
      userTotal[user.name] = {};
      userTotal[user.name].income = userIncome;
      userTotal[user.name].outgo = userOutgo;
    });
    return userTotal;
  }
}
