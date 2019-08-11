import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TableActionEvent, TableActionType} from '../table.model';

@Component({
  selector: 'app-table-action',
  template: `

  `,
  styleUrls: ['./table-action.component.scss']
})
export class TableActionComponent implements OnInit {
  @Input() actionType: TableActionType;
  @Input() labelTranslationKey: string;

  @Output() actionClick = new EventEmitter<TableActionEvent>();


  constructor() {
  }

  ngOnInit() {
  }

}
