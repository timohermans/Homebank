import { Component, OnInit } from '@angular/core';
import { Moment } from 'moment';
import * as moment from 'moment';

@Component({
  selector: 'app-budget-list',
  templateUrl: './budget-list.component.html',
  styleUrls: ['./budget-list.component.css']
})
export class BudgetListComponent implements OnInit {
  public monthToDisplay: Moment = moment().startOf('month');

  constructor() { }

  ngOnInit() {
  }

}
