import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User, Budget } from '../models';

interface Total {
  income: number;
  outgo: number;
}

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  private users: User[];
  private budgets: {
    income: Budget[],
    outgo : Budget[]
  };
  private total: Total;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const data = JSON.parse(params.data);
      this.users = data[0].map(data => new User(data.name));
      this.budgets = { income: [], outgo: [] };
      this.budgets.income = data[1].map(data => new Budget(data.title, data.price, data.user));
      this.budgets.outgo = data[2].map(data => new Budget(data.title, data.price, data.user));
      this.calc();
    });
  }

  calc() {
    this.total = this.sum(this.budgets);
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
}
