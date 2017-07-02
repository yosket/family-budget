export class User {

  name: string;

  constructor(name = '') {
    this.name = name;
  }
}

export class Budget {

  title: string;
  price: number;
  user : User;

  constructor(title: string, price: number, user: User) {
    this.title = title;
    this.price = price;
    this.user  = user;
  }
}

export class State {

  users  : User[];
  budgets: {
    income: Budget[];
    outgo : Budget[];
  };

  constructor() {
    this.users = [];
    this.budgets = { income: [], outgo: [] };
  }
}
