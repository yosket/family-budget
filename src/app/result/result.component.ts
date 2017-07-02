import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User, Budget } from '../models';

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

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const data = JSON.parse(params.data);
      this.users = data[0];
      this.budgets = { income: [], outgo: [] };
      this.budgets.income = data[1];
      this.budgets.outgo = data[2];
      this.calc();
    });
  }

  calc() {

  }
}
