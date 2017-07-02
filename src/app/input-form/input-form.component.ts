import { Component, Input, OnInit } from '@angular/core';
import { StoreService } from '../store.service';
import { User, Budget } from '../models';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.scss']
})
export class InputFormComponent implements OnInit {

  @Input() users: User[];
  @Input() type: 'income' | 'outgo';

  private budget  : Budget;
  private userName: string;

  constructor(private storeService: StoreService) { }

  ngOnInit() {
    this.budget = new Budget('', 0, this.users[0]);
  }

  add() {
    this.budget.user = this.users.find(user => user.name === this.userName);
    this.storeService.add(this.type, this.budget);
    this.budget = new Budget('', 0, this.users[0]);
  }
}
